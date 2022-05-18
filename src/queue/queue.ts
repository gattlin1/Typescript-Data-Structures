export class Queue<T> {
  private items: T[];

  public constructor() {
    this.items = [];
  }

  public enqueue(item: T): boolean {
    try {
      this.items.push(item);
      return true;
    } catch (_) {
      return false;
    }
  }

  public dequeue(): T | undefined {
    return this.items.shift();
  }

  public peek(): T | undefined {
    return this.items.at(0);
  }

  public get count() {
    return this.items.length;
  }
}
