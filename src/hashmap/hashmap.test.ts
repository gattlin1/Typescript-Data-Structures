import HashMap from './hashmap';

it('Initializes empty', () => {
  const hashmap: HashMap<string, number> = new HashMap();
  expect(hashmap.size).toBe(0);
});

it('Initializes with key/value pairs', () => {
  const items: [string, string][] = [
    ['Jefferson', 'Thomas'],
    ['Washington', 'George'],
  ];
  const hashMap: HashMap<string, string> = new HashMap(items);

  let matchesExpected = true;
  hashMap.items().forEach(([k, v], i) => {
    if (k !== items[i][0] || v !== items[i][1]) matchesExpected = false;
  });

  expect(matchesExpected).toBeTruthy();
  expect(hashMap.size).toBe(2);
});

it('Gets hashmap size', () => {
  const items: [string, number][] = [
    ['Jefferson', 6],
    ['Washington', 7],
    ['Hamilton', 3],
  ];
  const hashMap: HashMap<string, number> = new HashMap(items);

  expect(hashMap.size).toBe(3);
});

it('Inserts key/value pair', () => {
  const hashMap: HashMap<string, number> = new HashMap();
  const key = 'Jefferson';
  hashMap.insert(key, 6);

  expect(hashMap.get(key)).toBe(6);
  expect(hashMap.size).toBe(1);
});

it('Updates already inserted key', () => {
  const hashMap: HashMap<string, number> = new HashMap();
  const key = 'Jefferson';
  hashMap.insert(key, 6);
  hashMap.insert(key, 7);

  expect(hashMap.get(key)).toBe(7);
  expect(hashMap.size).toBe(1);
});

it('Deletes key/value pair', () => {
  const hashMap: HashMap<string, number> = new HashMap();
  const key = 'Jefferson';
  hashMap.insert(key, 6);
  const deleteStatus = hashMap.delete(key);

  expect(deleteStatus).toBeTruthy();
  expect(hashMap.get(key)).toBe(null);
  expect(hashMap.size).toBe(0);
});

it("Returns null when deleting a key/value pair isn't present", () => {
  const hashMap: HashMap<string, number> = new HashMap();
  const key = 'Jefferson';
  hashMap.insert(key, 6);
  const deleteStatus = hashMap.delete('Washington');

  expect(deleteStatus).toBeFalsy();
  expect(hashMap.get(key)).toBe(6);
});

it('Gets a key/value pair', () => {
  const hashMap: HashMap<string, number> = new HashMap();
  const key = 'Bob';
  hashMap.insert(key, 6);

  expect(hashMap.get(key)).toBe(6);
});

it('Returns null when getting a non-present key/value pair', () => {
  const hashMap: HashMap<string, number> = new HashMap();
  const key = 'Bob';
  hashMap.insert(key, 6);

  expect(hashMap.get('Steve')).toBe(null);
});

it('Gets all key/value pairs', () => {
  const hashMap: HashMap<string, number> = new HashMap();
  hashMap.insert('Jefferson', 6);
  hashMap.insert('Washington', 7);

  const expected: [string, number][] = [
    ['Jefferson', 6],
    ['Washington', 7],
  ];

  let matchesExpected = true;
  hashMap.items().forEach(([k, v], i) => {
    if (k !== expected[i][0] || v !== expected[i][1]) matchesExpected = false;
  });

  expect(matchesExpected).toBeTruthy();
});
