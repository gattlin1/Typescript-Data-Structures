import { MockShuffler, ShufflePeeker, ShufflerClone } from './Shuffler';

it('cycles through the deck', () => {
  const shuffler = new MockShuffler();
  const cycle = [];

  for (let i = 0; i < 51; i++) {
    cycle.push(shuffler.draw());
  }

  for (const draw of cycle) {
    expect(shuffler.draw()).toBe(draw);
  }
});

it('peeks', () => {
  const shuffler = new MockShuffler();
  const peeker = new ShufflePeeker(shuffler);

  const peekedCard = peeker.peek();
  expect(peeker.draw()).toBe(peekedCard);
});

it('clones', () => {
  const shuffler = new MockShuffler();
  const clone_1 = new ShufflerClone(shuffler);
  clone_1.draw();
  const clone_2 = clone_1.clone();

  expect(clone_1.draw()).toBe(clone_2.draw());
  expect(clone_1.draw()).toBe(clone_2.draw());
});
