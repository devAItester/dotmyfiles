'use strict';

const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const readline = require('node:readline/promises');
const { stdin, stdout } = require('node:process');

const PROPERTY_FILE = 'property-obsidian.txt';
const APP_PROPERTY_FILE = 'property-app.txt';

function askInterface() {
  return readline.createInterface({ input: stdin, output: stdout });
}

function readRegistryCandidates() {
  const home = os.homedir();
  switch (process.platform) {
    case 'win32': {
      const appData = process.env.APPDATA || path.join(home, 'AppData', 'Roaming');
      return [path.join(appData, 'obsidian', 'obsidian.json')];
    }
    case 'darwin':
      return [path.join(home, 'Library', 'Application Support', 'obsidian', 'obsidian.json')];
    case 'linux': {
      const configHome = process.env.XDG_CONFIG_HOME || path.join(home, '.config');
      return [
        path.join(configHome, 'obsidian', 'obsidian.json'),
        path.join(home, '.var', 'app', 'md.obsidian.Obsidian', 'config', 'obsidian', 'obsidian.json'),
        path.join(home, 'snap', 'obsidian', 'current', '.config', 'obsidian', 'obsidian.json'),
      ];
    }
    default:
      throw new Error(`Неподдерживаемая ОС: ${process.platform}`);
  }
}

function detectOsKey() {
  if (process.platform === 'win32') return 'win';
  if (process.platform === 'darwin') return 'mac';
  if (process.platform === 'linux' && fs.existsSync('/etc/arch-release')) return 'arch';
  throw new Error(`ОС ${process.platform} пока не поддерживается задачей Obsidian.`);
}

function findRegistry() {
  const candidates = readRegistryCandidates();
  const found = candidates.filter((candidate) => fs.existsSync(candidate));
  if (found.length === 0) {
    throw new Error(`Реестр Obsidian не найден. Проверены пути:\n${candidates.join('\n')}`);
  }
  if (found.length > 1) {
    throw new Error(`Найдено несколько реестров Obsidian; выбери нужный вручную:\n${found.join('\n')}`);
  }
  return found[0];
}

function parsePropertyRegistry(filePath, delimiter = '|') {
  const result = new Map();
  const source = fs.readFileSync(filePath, 'utf8');
  for (const rawLine of source.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;
    const [key, type, values, ...rest] = line.split(delimiter);
    if (key && type) {
      result.set(key.trim(), {
        type: type.trim(),
        values: values && values.trim() !== '-' ? values.split(',').map((value) => value.trim()) : [],
        description: rest.join(delimiter).trim(),
      });
    }
  }
  return result;
}

function parseSettings(source, appProperties, obsidianProperties) {
  const settings = {};
  const warnings = [];
  let inComment = false;

  for (const rawLine of source.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (line.includes('<!--')) {
      inComment = true;
      if (line.includes('-->')) inComment = false;
      continue;
    }
    if (inComment || !line || line.startsWith('#') || line.startsWith('//')) {
      if (inComment && line.includes('-->')) inComment = false;
      continue;
    }

    const match = line.match(/^([A-Za-z][A-Za-z0-9.]*)\s*:\s*(.+)$/);
    if (!match) continue;
    const [, key, rawValue] = match;
    const property = appProperties.get(key) || obsidianProperties.get(key);
    if (!property) {
      warnings.push(`Неизвестное свойство пропущено: ${key}`);
      continue;
    }

    let value;
    try {
      value = JSON.parse(rawValue);
    } catch {
      if (property.type === 'string' || property.type === 'enum') value = rawValue;
      else throw new Error(`Некорректное значение для ${key}: ${rawValue}`);
    }

    if (property.type === 'boolean' && typeof value !== 'boolean') {
      throw new Error(`${key} должен иметь значение true или false.`);
    }
    if ((property.type === 'string' || property.type === 'enum') && typeof value !== 'string') {
      throw new Error(`${key} должен иметь строковое значение.`);
    }
    if (property.type === 'enum' && !property.values.includes(value)) {
      throw new Error(`${key}: недопустимое значение ${JSON.stringify(value)}. Допустимо: ${property.values.join(', ')}.`);
    }
    if (key.startsWith('configDir.') && (!value.startsWith('.') || value === '.' || /[\\/]/.test(value))) {
      throw new Error(`${key} должен содержать имя папки, начинающееся с точки, без разделителей пути.`);
    }
    settings[key] = value;
  }

  if (inComment) throw new Error('В файле настроек не закрыт Markdown-комментарий.');
  return { settings, warnings };
}

async function chooseVault(vaults, rl) {
  if (vaults.length === 0) throw new Error('В реестре Obsidian нет зарегистрированных хранилищ.');
  console.log(`Найдено хранилищ: ${vaults.length}`);
  vaults.forEach((vault, index) => console.log(`${index + 1}. ${vault.path}`));
  const answer = (await rl.question('Номер хранилища [1]: ')).trim();
  const selected = answer === '' ? 1 : Number(answer);
  if (!Number.isInteger(selected) || selected < 1 || selected > vaults.length) {
    throw new Error(`Введи номер от 1 до ${vaults.length}.`);
  }
  return vaults[selected - 1].path;
}

function timestamp() {
  return new Date().toISOString().replace(/[:.]/g, '-');
}

async function run({ taskPath }) {
  const taskDir = path.dirname(taskPath);
  const osKey = detectOsKey();
  const appProperties = parsePropertyRegistry(path.join(taskDir, APP_PROPERTY_FILE));
  const obsidianProperties = parsePropertyRegistry(path.join(taskDir, PROPERTY_FILE));
  const parsed = parseSettings(fs.readFileSync(taskPath, 'utf8'), appProperties, obsidianProperties);

  const configDirName = parsed.settings[`configDir.${osKey}`];
  if (typeof configDirName !== 'string') {
    throw new Error(`В obsidian.md не задано configDir.${osKey}.`);
  }
  const appSettings = Object.fromEntries(
    Object.entries(parsed.settings).filter(([key]) => obsidianProperties.has(key)),
  );
  if (Object.keys(appSettings).length === 0) throw new Error('В obsidian.md нет активных ключей app.json.');

  const registryPath = findRegistry();
  const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
  const vaults = Object.values(registry.vaults || {})
    .filter((vault) => vault && typeof vault.path === 'string' && vault.path.length > 0);

  console.log(`ОС: ${osKey}`);
  console.log(`Реестр: ${registryPath}`);
  const rl = askInterface();
  try {
    const vaultPath = path.resolve(await chooseVault(vaults, rl));
    if (!fs.existsSync(vaultPath) || !fs.statSync(vaultPath).isDirectory()) {
      throw new Error(`Путь выбранного хранилища недоступен: ${vaultPath}`);
    }

    const targetDir = path.join(vaultPath, configDirName);
    const defaultDir = path.join(vaultPath, '.obsidian');
    const appJsonPath = path.join(targetDir, 'app.json');
    const targetExists = fs.existsSync(targetDir);
    const defaultExists = fs.existsSync(defaultDir) && fs.statSync(defaultDir).isDirectory();
    const sourceAppJsonPath = targetExists
      ? appJsonPath
      : (defaultExists ? path.join(defaultDir, 'app.json') : null);

    // Validate the source JSON before creating or copying any configuration folder.
    let current = {};
    if (sourceAppJsonPath && fs.existsSync(sourceAppJsonPath)) {
      try {
        current = JSON.parse(fs.readFileSync(sourceAppJsonPath, 'utf8'));
      } catch (error) {
        throw new Error(`Не удалось прочитать ${sourceAppJsonPath}: ${error.message}`);
      }
      if (!current || typeof current !== 'object' || Array.isArray(current)) {
        throw new Error(`${sourceAppJsonPath} должен содержать JSON-объект.`);
      }
    }

    console.log(`\nХранилище: ${vaultPath}`);
    console.log(`Папка конфигурации ОС: ${targetDir}`);
    console.log('Активные настройки app.json:');
    for (const [key, value] of Object.entries(appSettings)) console.log(`  ${key}: ${JSON.stringify(value)}`);
    for (const warning of parsed.warnings) console.warn(`WARNING: ${warning}`);

    const confirm = (await rl.question('\nУбедись, что Obsidian закрыт. Применить настройки? [y/N]: ')).trim().toLowerCase();
    if (confirm !== 'y' && confirm !== 'yes' && confirm !== 'д' && confirm !== 'да') {
      console.log('Отменено. Файлы не изменены.');
      return;
    }

    if (!targetExists) {
      if (defaultExists) {
        fs.cpSync(defaultDir, targetDir, { recursive: true, errorOnExist: true, force: false });
        console.log(`Создана копия ${path.basename(defaultDir)} → ${configDirName}.`);
      } else {
        fs.mkdirSync(targetDir, { recursive: true });
        console.log(`Создана папка ${configDirName}.`);
      }
    }

    const updated = { ...current };
    const changed = [];
    for (const [key, value] of Object.entries(appSettings)) {
      if (JSON.stringify(updated[key]) !== JSON.stringify(value)) {
        updated[key] = value;
        changed.push(key);
      }
    }

    if (changed.length === 0) {
      console.log('Настройки уже соответствуют obsidian.md; app.json не изменён.');
    } else {
      if (fs.existsSync(appJsonPath)) {
        const backupPath = `${appJsonPath}.bak-${timestamp()}`;
        fs.copyFileSync(appJsonPath, backupPath, fs.constants.COPYFILE_EXCL);
        console.log(`Резервная копия: ${backupPath}`);
      }
      fs.writeFileSync(appJsonPath, `${JSON.stringify(updated, null, 2)}\n`, { encoding: 'utf8', flag: 'w' });
      console.log(`Изменены ключи: ${changed.join(', ')}`);
      console.log(`Записано: ${appJsonPath}`);
    }

    console.log('\nСледующий шаг в Obsidian:');
    console.log('Настройки → Files and links → Override config folder');
    console.log(`Укажи ${configDirName} и перезапусти Obsidian.`);
    console.log('Старая папка .obsidian не удалялась. Удаляй её только после проверки, что Obsidian использует новую конфигурацию.');
  } finally {
    rl.close();
  }
}

module.exports = { run };
