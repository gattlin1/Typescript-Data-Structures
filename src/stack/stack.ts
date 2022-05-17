export class Stack<T> {
  private list: T[];

  public get count() {
    return this.list.length;
  }

  public constructor(items: T[] = []) {
    this.list = items;
  }

  public peek(): T | undefined {
    return this.list.at(-1);
  }

  public push(item: T): void {
    this.list.push(item);
  }

  public pop(): T | undefined {
    return this.list.pop();
  }

  public clear(): void {
    this.list = [];
  }
}
