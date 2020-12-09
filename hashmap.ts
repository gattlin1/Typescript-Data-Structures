class HashMap<K, V> {
    items: Array<Array<[K, V]>>;
    public count: number;

    constructor() {
        this.items = new Array(2);
        this.count = 0;
    }

    public insert(key: K, value: V) {
        if (this.isSparse()) {
            const bucket = this.hash(key);
            if (this.items[bucket]) {
                this.items[bucket].push([key, value]);
            } else {
                this.items[bucket] = [[key, value]];
            }
            this.count++;
        }
    }

    public get(key: K): V | null {
        const bucket = this.hash(key);
        if (!this.items[bucket]) {
            return null;
        }

        this.items[bucket].forEach((item) => {
            if (key === item[0]) {
                return item[1];
            }
        })
        return null;
    }

    public remove(key: K) {
        const bucket = this.hash(key);

        if (this.items[bucket]) {
            const itemToRemoveIdx = this.items[bucket].findIndex(item => item[0] === key);

            if (itemToRemoveIdx > -1) {
                this.items[bucket].splice(itemToRemoveIdx, 1);
                this.count--;
            }
        }
    }

    private resize() {
        const newItems: Array<Array<[K, V]>> = new Array(this.items.length * 2);
        this.items.forEach(bucket => {
            if (bucket) {
                bucket.forEach(item => {
                    const newBucket = this.hash(item[0]);
                    if (newItems[newBucket]) {
                        newItems[newBucket].push(item);
                    } else {
                        newItems[newBucket] = [item];
                    }
                });
            }
        })
        this.items = newItems;
    }

    private isSparse(): boolean {
        return this.count < this.items.length * 3 / 4;
    }

    // TODO: add type specific hash functions
    private hash<K>(key: K): number {
        return 5;
    }
}

export default HashMap;