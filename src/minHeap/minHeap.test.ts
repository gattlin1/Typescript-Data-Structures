import { MinHeap } from './minHeap';

it('should return the peek for an one-element heap', () => {
  const heap = new MinHeap();
  heap.add(4);
  heap.add(3);
  heap.add(2);
  heap.add(1);
  heap.add(0);
  expect(heap.remove()).toEqual(0);
  expect(heap.remove()).toEqual(1);
  expect(heap.remove()).toEqual(2);
  expect(heap.remove()).toEqual(3);
  expect(heap.remove()).toEqual(4);
  expect(heap.remove()).toBeNull();
});

it('should return nothing if nothing is in the heap', () => {
  const heap = new MinHeap();
  expect(heap.remove()).toBeNull();
});

it('should peak but not remove the element', () => {
  const heap = new MinHeap();
  heap.add(1);
  expect(heap.peek()).toBe(1);
  expect(heap.remove()).toBe(1);
});
