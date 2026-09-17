// Бизнес-логика задач.
// Хранение делегируется в ./storage.js, настройки берутся из ../config.json

const { MemoryStorage } = require('./storage');
const config = require('../config.json');

class TaskManager {
  constructor(storage = new MemoryStorage(config.maxTasks)) {
    this.storage = storage;
  }

  /** Добавить новую задачу. */
  add(title, priority = config.defaultPriority) {
    if (!config.priorities.includes(priority)) {
      throw new Error(`Неизвестный приоритет: ${priority}`);
    }
    return this.storage.add({ title, priority, done: false });
  }

  /** Отметить задачу выполненной. */
  complete(id) {
    return this.storage.update(id, { done: true });
  }

  /** Вернуть задачи, опционально отфильтровав по статусу. */
  list({ onlyOpen = false } = {}) {
    const tasks = this.storage.all();
    return onlyOpen ? tasks.filter((t) => !t.done) : tasks;
  }
}

module.exports = { TaskManager };
