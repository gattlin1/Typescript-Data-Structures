import { Queue } from './queue';

it('Enqueues', () => {
  const queue: Queue<number> = new Queue();
  const status = queue.enqueue(1);

  expect(status).toBeTruthy();
  expect(queue.count).toBe(1);
});

it('Dequeues', () => {
  const queue: Queue<boolean> = new Queue();
  queue.enqueue(true);
  const item = queue.dequeue();

  expect(item).toBe(true);
  expect(queue.count).toBe(0);
});

it('Peeks', () => {
  const queue: Queue<string> = new Queue();
  queue.enqueue('bob');
  const item = queue.peek();

  expect(item).toBe('bob');
  expect(queue.count).toBe(1);
});

it('Gets count', () => {
  const queue: Queue<string> = new Queue();
  queue.enqueue('bob');

  expect(queue.count).toBe(1);
});
