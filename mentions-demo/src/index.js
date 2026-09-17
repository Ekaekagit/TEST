// Точка входа. Связывает ./tasks.js, ./storage.js и ../config.json.

const { TaskManager } = require('./tasks');
const config = require('../config.json');

function main() {
  console.log(`Запуск ${config.appName}`);

  const manager = new TaskManager();
  manager.add('Прочитать README', 'high');
  manager.add('Попробовать @-упоминания');
  const t3 = manager.add('Закрыть эту задачу', 'low');
  manager.complete(t3.id);

  console.log('Все задачи:', manager.list());
  console.log('Открытые задачи:', manager.list({ onlyOpen: true }));
}

if (require.main === module) {
  main();
}

module.exports = { main };
