interface ShufflerAPI {
  draw: () => string;
}

export class MockShuffler implements ShufflerAPI {
  private deck: string[];
  private currIndex: number;

  constructor(defaultDeck: string[] = [], currIndex = 0) {
    this.deck = defaultDeck;
    this.currIndex = currIndex;

    if (this.deck.length === 0) {
      const suits = ['H', 'S', 'D', 'C'];
      const ranks = [
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '10',
        'J',
        'Q',
        'K',
        'A',
      ];

      for (const suit of suits) {
        for (const rank of ranks) {
          this.deck.push(`${suit}${rank}`);
        }
      }
      this.shuffle();
    }
  }

  private shuffle() {
    for (let i = this.deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
    }
  }

  public draw() {
    const topCard = this.deck[this.currIndex];
    this.currIndex = (this.currIndex + 1) % (this.deck.length - 1);
    return topCard;
  }

  public copy() {
    return new MockShuffler(this.deck, this.currIndex);
  }
}

export class ShufflePeeker implements ShufflerAPI {
  private shuffler: MockShuffler;
  private queue: string[];

  constructor(mockShuffler: MockShuffler) {
    this.shuffler = mockShuffler;
    this.queue = [];
  }

  public peek() {
    const card = this.shuffler.draw();
    this.queue.push(card);
    return card;
  }

  public draw() {
    if (this.queue.length >= 1) {
      return this.queue.shift() as string;
    } else {
      return this.shuffler.draw();
    }
  }
}

export class ShufflerClone implements ShufflerAPI {
  private shuffler: MockShuffler;

  constructor(mockShuffler: MockShuffler) {
    this.shuffler = mockShuffler;
  }

  public draw() {
    return this.shuffler.draw();
  }

  public clone(): ShufflerClone {
    return new ShufflerClone(this.shuffler.copy());
  }
}
