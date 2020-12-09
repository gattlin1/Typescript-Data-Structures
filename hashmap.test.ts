import HashMap from './hashmap';

function itInserts() {
    const hashMap: HashMap<String, number> = new HashMap();
    const key = 'Jefferson'
    hashMap.insert(key, 6);
    console.log(hashMap.get(key) === 6);
}

function runTests() {
    itInserts();
}