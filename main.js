#!/usr/bin/env node
'use strict';

const fs = require('node:fs');
const path = require('node:path');

const rootDir = __dirname;
const manifestPath = path.join(rootDir, 'main.md');

function readTasks(source) {
  const tasks = [];
  let inComment = false;

  for (const rawLine of source.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (line.includes('<!--')) {
      inComment = true;
      if (line.includes('-->')) inComment = false;
      continue;
    }
    if (inComment) {
      if (line.includes('-->')) inComment = false;
      continue;
    }
    if (!line || line.startsWith('#') || line.startsWith('//')) continue;
    if (/^[A-Za-z0-9_./-]+\.md$/.test(line)) tasks.push(line);
  }

  if (inComment) throw new Error('В main.md не закрыт Markdown-комментарий.');
  return tasks;
}

async function main() {
  if (!fs.existsSync(manifestPath)) {
    throw new Error(`Не найден список задач: ${manifestPath}`);
  }

  const tasks = readTasks(fs.readFileSync(manifestPath, 'utf8'));
  if (tasks.length === 0) {
    console.log('В main.md нет подключённых задач.');
    return;
  }

  for (const relativeTask of tasks) {
    const taskPath = path.resolve(rootDir, relativeTask);
    if (!taskPath.startsWith(`${rootDir}${path.sep}`)) {
      throw new Error(`Путь задачи выходит за пределы проекта: ${relativeTask}`);
    }
    if (!fs.existsSync(taskPath)) {
      throw new Error(`Файл задачи не найден: ${relativeTask}`);
    }

    const handlerPath = taskPath.replace(/\.md$/i, '.js');
    if (!fs.existsSync(handlerPath)) {
      throw new Error(`Не найден обработчик задачи: ${path.relative(rootDir, handlerPath)}`);
    }

    console.log(`\n=== ${relativeTask} ===`);
    const handler = require(handlerPath);
    if (!handler || typeof handler.run !== 'function') {
      throw new Error(`Обработчик должен экспортировать run(): ${path.relative(rootDir, handlerPath)}`);
    }
    await handler.run({ rootDir, taskPath });
  }
}

main().catch((error) => {
  console.error(`ERROR: ${error.message}`);
  process.exitCode = 1;
});
