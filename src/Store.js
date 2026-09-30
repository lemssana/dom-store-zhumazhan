export class Store {
  #items = [];

  constructor(initialItems = []) {
    if (Array.isArray(initialItems)) {
      initialItems.forEach((item) => this.add(item));
    }
  }

  static isValidItem(item) {
    return (
      item !== null &&
      typeof item === 'object' &&
      typeof item.name === 'string' &&
      item.name.trim() !== '' &&
      typeof item.price === 'number' &&
      !isNaN(item.price) &&
      item.price > 0 &&
      typeof item.qty === 'number' &&
      !isNaN(item.qty) &&
      item.qty >= 0
    );
  }

  get count() {
    return this.#items.length;
  }

  add(item) {
    if (!Store.isValidItem(item)) {
      return false;
    }
    const existing = this.#items.find((i) => i.name.toLowerCase() === item.name.trim().toLowerCase());
    if (existing) {
      existing.qty += item.qty;
    } else {
      this.#items.push({ name: item.name.trim(), price: item.price, qty: item.qty });
    }
    return true;
  }

  remove(name) {
    const index = this.#items.findIndex((item) => item.name === name);
    if (index !== -1) {
      this.#items.splice(index, 1);
      return true;
    }
    return false;
  }

  updateQty(name, delta) {
    const item = this.#items.find((i) => i.name === name);
    if (item) {
      const newQty = item.qty + delta;
      if (newQty <= 0) {
        this.remove(name);
      } else {
        item.qty = newQty;
      }
      return true;
    }
    return false;
  }

  total() {
    return this.#items.reduce((sum, item) => sum + item.price * item.qty, 0);
  }

  getItems() {
    return this.#items.map((item) => ({ ...item }));
  }
}