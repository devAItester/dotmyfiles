const fs = require("node:fs");
const path = require("node:path");
const os = require("node:os");
const readline = require("node:readline");

const appData = process.env.APPDATA || path.join(os.homedir(), "AppData", "Roaming");
const registry = path.join(appData, "obsidian", "obsidian.json");

function fail(message) {
  console.error(message);
  process.exitCode = 1;
}

if (!fs.existsSync(registry)) {
  fail(`Реестр Obsidian не найден: ${registry}`);
} else {
  try {
    const data = JSON.parse(fs.readFileSync(registry, "utf8"));
    const vaults = Object.values(data.vaults || {})
      .map((vault) => vault && vault.path)
      .filter((vaultPath) => typeof vaultPath === "string" && vaultPath.length > 0);

    console.log(`Реестр: ${registry}`);
    console.log(`Найдено хранилищ: ${vaults.length}`);

    if (vaults.length === 0) {
      fail("В реестре не найдено путей хранилищ.");
    } else {
      vaults.forEach((vaultPath, index) => {
        console.log(`${index + 1}. ${vaultPath}`);
      });

      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });

      rl.question("Номер [1]: ", (answer) => {
        const input = answer.trim();
        const selected = input === "" ? 1 : Number(input);

        if (!Number.isInteger(selected) || selected < 1 || selected > vaults.length) {
          fail(`Введи номер от 1 до ${vaults.length}.`);
        } else {
          console.log(vaults[selected - 1]);
        }

        rl.close();
      });
    }
  } catch (error) {
    fail(`Не удалось прочитать реестр Obsidian: ${error.message}`);
  }
}
