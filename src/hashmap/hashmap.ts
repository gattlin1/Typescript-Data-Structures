type KeyTypes = string;
type IBucket<K, V> = [[K, V]][];

export default class HashMap<K extends KeyTypes, V> {
  private size: number;
  private buckets: IBucket<K, V>;

  public constructor(items: [K, V][] = []) {
    this.size = 0;
    this.buckets = new Array(16);

    for (const [k, v] of items) {
      this.insert(k, v);
    }
  }

  public insert(key: K, value: V) {
    if (!this.isSparse()) this.resize();

    const bucket = this.hash(key);
    if (!this.buckets[bucket]) {
      const newBucket = [];
      newBucket.push([key, value]);
    } else {
      const keyPresentIndex = this.buckets[bucket].findIndex(
        ([k, _]) => k === key
      );
      if (keyPresentIndex === -1) {
        this.buckets[bucket][keyPresentIndex][1] = value;
      } else {
        this.buckets[bucket].push([key, value]);
      }
    }
  }

  public get(key: K): V | null {
    const bucket = this.hash(key);
    for (const [k, v] of this.buckets[bucket]) {
      if (key === k) return v;
    }

    return null;
  }

  private resize() {
    const newSize = this.buckets.length * 2;
    const tempNewBuckets: IBucket<K, V> = new Array(newSize);

    for (const bucket of this.buckets) {
      for (const [key, value] of bucket) {
        const bucket = this.hash(key);
        if (!tempNewBuckets[bucket]) {
          const newBucket = [];
          newBucket.push([key, value]);
        } else {
          tempNewBuckets[bucket].push([key, value]);
        }
      }
    }

    this.buckets = tempNewBuckets;
  }

  private isSparse(): boolean {
    return this.size < (this.buckets.length * 3) / 4;
  }

  private hash(value: K): number {
    const sum = value
      .split('')
      .reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0);

    return sum % this.size;
  }
}
