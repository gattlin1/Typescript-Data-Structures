import { Stack } from './stack';

it('Initializes empty', () => {
  const stack: Stack<number> = new Stack();
  expect(stack.count).toBe(0);
});

it('Initializes with list', () => {
  const list = [1, 2, 3, 4];
  const stack: Stack<number> = new Stack(list);

  expect(stack.pop()).toBe(4);
  expect(stack.pop()).toBe(3);
  expect(stack.pop()).toBe(2);
  expect(stack.pop()).toBe(1);
  expect(stack.count).toBe(0);
});

it('Gets count', () => {
  const stack: Stack<string> = new Stack();
  stack.push('abc');

  expect(stack.count).toBe(1);
});

it('Inserts item', () => {
  const stack: Stack<string> = new Stack();
  stack.push('abc');

  expect(stack.peek()).toBe('abc');
});

it('Pops Item', () => {
  const stack: Stack<string> = new Stack();
  stack.push('abc');

  expect(stack.pop()).toBe('abc');
  expect(stack.pop()).toBe(undefined);
  expect(stack.count).toBe(0);
});

it('Peeks Item', () => {
  const stack: Stack<string> = new Stack();
  stack.push('abc');

  expect(stack.pop()).toBe('abc');
  expect(stack.pop()).toBe(undefined);
});

it('Returns undefined if no item to pop', () => {
  const stack: Stack<string> = new Stack();

  expect(stack.pop()).toBe(undefined);
});

it('Clears stack', () => {
  const list = [1, 2, 3, 4];
  const stack: Stack<number> = new Stack(list);
  stack.clear();

  expect(stack.count).toBe(0);
});
