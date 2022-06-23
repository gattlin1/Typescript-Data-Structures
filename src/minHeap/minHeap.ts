export class MinHeap {
  private items: number[];

  public constructor() {
    this.items = [];
  }

  private getLeftChildIndex(parentIndex: number): number {
    return parentIndex * 2 + 1;
  }

  private getRightChildIndex(parentIndex: number): number {
    return parentIndex * 2 + 2;
  }

  private getParentIndex(childIndex: number): number {
    if (childIndex % 2 === 0) {
      return (childIndex - 2) / 2;
    } else {
      return (childIndex - 1) / 2;
    }
  }

  private leftChild(index: number): number {
    return this.items[this.getLeftChildIndex(index)];
  }

  private rightChild(index: number): number {
    return this.items[this.getRightChildIndex(index)];
  }

  private parent(index: number): number {
    return this.items[this.getParentIndex(index)];
  }

  private hasLeftChild(index: number): boolean {
    return this.getLeftChildIndex(index) < this.items.length;
  }

  private hasRightChild(index: number): boolean {
    return this.getRightChildIndex(index) < this.items.length;
  }

  private hasParent(index: number): boolean {
    return this.getParentIndex(index) >= 0;
  }

  private swap(a: number, b: number): void {
    const temp = this.items[a];
    this.items[a] = this.items[b];
    this.items[b] = temp;
  }

  public peek(): number | undefined {
    return this.items.at(0);
  }

  public add(item: number): void {
    this.items.push(item);
    this.heapifyUp();
  }

  public remove(): number | null {
    if (this.items.length === 0) return null;

    const item = this.items[0];
    this.items[0] = this.items[this.items.length - 1];
    this.items.pop();
    this.heapifyDown();

    return item;
  }

  private heapifyUp(): void {
    let currentIndex = this.items.length - 1;

    while (
      this.hasParent(currentIndex) &&
      this.parent(currentIndex) < this.items[currentIndex]
    ) {
      const parentIndex = this.getParentIndex(currentIndex);
      this.swap(parentIndex, currentIndex);
      currentIndex = parentIndex;
    }
  }

  private heapifyDown(): void {
    let currentIndex = 0;

    // only need to check for left child because of heap properties. If no left child
    // then there is no right child
    while (this.hasLeftChild(currentIndex)) {
      let smallerChildIndex = this.getLeftChildIndex(currentIndex);
      if (
        this.hasRightChild(currentIndex) &&
        this.rightChild(currentIndex) < this.leftChild(currentIndex)
      ) {
        smallerChildIndex = this.getRightChildIndex(currentIndex);
      }

      if (this.items[currentIndex] > this.items[smallerChildIndex]) {
        this.swap(currentIndex, smallerChildIndex);
        currentIndex = smallerChildIndex;
      } else {
        return;
      }
    }
  }
}
