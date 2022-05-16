import HashMap from './hashmap';

function itInitializesEmpty() {
  const hashmap: HashMap<string, number> = new HashMap();

  console.log('It initializes with no items: ', hashmap.size === 0);
}

function itInitializesWithItems() {
  const items: [string, number][] = [
    ['Jefferson', 6],
    ['Washington', 7],
  ];
  const hashMap: HashMap<string, number> = new HashMap(items);

  let matchesExpected = true;
  hashMap.items().forEach(([k, v], i) => {
    if (k !== items[i][0] || v !== items[i][1]) matchesExpected = false;
  });

  console.log(
    'It initializes with items: ',
    matchesExpected && hashMap.size === 2
  );
}

function itInserts() {
  const hashMap: HashMap<string, number> = new HashMap();
  const key = 'Jefferson';
  hashMap.insert(key, 6);

  console.log('It inserts: ', hashMap.get(key) === 6 && hashMap.size === 1);
}

function itUpdatesAlreadyInsertedKey() {
  const hashMap: HashMap<string, number> = new HashMap();
  const key = 'Jefferson';
  hashMap.insert(key, 6);
  hashMap.insert(key, 7);

  console.log(
    'It updates already inserted key: ',
    hashMap.get(key) === 7 && hashMap.size === 1
  );
}

function itDeletes() {
  const hashMap: HashMap<string, number> = new HashMap();
  const key = 'Jefferson';
  hashMap.insert(key, 6);
  hashMap.delete(key);

  console.log('It deletes: ', hashMap.get(key) === null && hashMap.size === 0);
}

function itGetsAllItems() {
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

  console.log('It gets all items: ', matchesExpected);
}

function runTests() {
  itInitializesEmpty();
  itInitializesWithItems();
  itInserts();
  itUpdatesAlreadyInsertedKey();
  itDeletes();
  itGetsAllItems();
}

runTests();
