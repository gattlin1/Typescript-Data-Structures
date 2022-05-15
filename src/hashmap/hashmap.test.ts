import HashMap from './hashmap';

function itInserts() {
  const hashMap: HashMap<string, number> = new HashMap();
  const key = 'Jefferson';
  hashMap.insert('Jefferson', 6);
  console.log(hashMap.get(key) === 6);
}

function runTests() {
  itInserts();
}

runTests();
