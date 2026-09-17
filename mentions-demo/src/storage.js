// Слой хранения задач в памяти.
// Используется бизнес-логикой из ./tasks.js

/**
 * Простое хранилище задач в оперативной памяти.
 * В реальном приложении здесь была бы БД или файл.
 */
class MemoryStorage {
  constructor(maxTasks = 100) {
    this.maxTasks = maxTasks;
    this.items = new Map();
    this.nextId = 1;
  }

  add(task) {
    if (this.items.size >= this.maxTasks) {
      throw new Error(`Достигнут лимит задач: ${this.maxTasks}`);
    }
    const id = this.nextId++;
    const stored = { id, ...task };
    this.items.set(id, stored);
    return stored;
  }

  update(id, patch) {
    const existing = this.items.get(id);
    if (!existing) return null;
    const updated = { ...existing, ...patch };
    this.items.set(id, updated);
    return updated;
  }

  all() {
    return [...this.items.values()];
  }

  get(id) {
    return this.items.get(id) || null;
  }
}

module.exports = { MemoryStorage };
