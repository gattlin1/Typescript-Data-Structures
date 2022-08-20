type KeyTypes = string; //maybe add the ability to do more key types
type Bucket<K, V> = [K, V][];
type Buckets<K, V> = Bucket<K, V>[];

export default class HashMap<K extends KeyTypes, V> {
  private _size: number;
  private buckets: Buckets<K, V>;

  public constructor(items: Bucket<K, V> = []) {
    this._size = 0;
    this.buckets = Array.from(Array(16), () => []);

    for (const [k, v] of items) {
      this.insert(k, v);
    }
  }

  public get size() {
    return this._size;
  }

  public insert(key: K, value: V) {
    if (!this.isSparse()) this.resize();

    const bucket = this.hash(key);
    const presentKeyIndex = this.buckets[bucket].findIndex(
      ([k, _]) => k === key
    );
    if (presentKeyIndex !== -1) {
      this.buckets[bucket][presentKeyIndex][1] = value;
    } else {
      this.buckets[bucket].push([key, value]);
      this._size++;
    }
  }

  public delete(key: K): boolean {
    const bucket = this.hash(key);
    const index = this.buckets[bucket].findIndex(([k, _]) => key === k);
    if (index !== -1) {
      this.buckets[bucket].splice(index, 1);
      this._size--;
      return true;
    }

    return false;
  }

  public get(key: K): V | null {
    const bucket = this.hash(key);
    const value = this.buckets[bucket].find(([k, _]) => key === k);
    if (value) return value[1];

    return null;
  }

  public items(): Bucket<K, V> {
    const items: Bucket<K, V> = [];

    for (const bucket of this.buckets) {
      if (bucket) {
        for (const bucketItem of bucket) {
          items.push(bucketItem);
        }
      }
    }
    return items;
  }

  private resize() {
    const newSize = this.buckets.length * 2;
    const tempNewBuckets: Buckets<K, V> = Array.from(Array(newSize), () => []);

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

    return sum % this.buckets.length;
  }
}
