/*
 * Hashmap implementation in js
 *
 */

const log = console.log;
const assert = console.assert;

// Entry Class
const Entry = function(key, value, next) {
    this.key = key;
    this.value = value;
    this.next = next;
}

// Hashmap Class
const Hashmap = function() {

    this.size   = 100;
    this.bucket = Array(this.size);

    // calculate hash value
    // using djb hash algorithm
    this.hash = function(string) {
        let total = 5381;        
        for (let i = 0; i < string.length; i++) {
            total += total << 5;
            total ^= string.codePointAt(i);
            total &= (1 << 31) -1;
        }
        return total & (this.size-1);
    }

    // register key and value to this bucket
    this.put = function(key, value) {
        let h = this.hash(key);
        let entry = new Entry(key, value, null);

        if (this.bucket[h] === undefined) {
            this.bucket[h] = entry;
            return;
        }
        
        let n = this.bucket[h];

        while (n !== null) {
            if (n.key === key) {
                n.value = value;
                break;
            }
            if (n.next === null) {
                n.next = new Entry(key, value, null);
            }
            n = n.next;
        }
    }

    // get value from this bucket with key
    this.get = function(key) {
        let h = this.hash(key);
        let n = this.bucket[h];

        if (n === undefined) {
            return null;   
        }

        while (n !== null) {
            if (n.key === key) {
                return n.value
            }
            n = n.next;
        }
        return null;
    }
}

// unit test for hashmap
function test() {
    const h = new Hashmap();

    // Set the value
    const testcase1 = [
        ["test1", 1],
        ["test2", 2.0],
        ["test3", "test3"],
        ["test4_テスト", "test4"],
        ["test5", "test5_テスト"],
        ["test6_テスト", "test6_テスト"],
    ];

    for (let i of testcase1) {
        h.put(i[0], i[1]);
    }  

    for (let i of testcase1) {
        assert(h.get(i[0]) === i[1]);
    }

    // Replace the value
    h.put("changedValue", 0);
    assert(h.get("changedValue") === 0);
    h.put("changedValue", 100)
    assert(h.get("changedValue") === 100);
    h.put("changedValue", "value")
    assert(h.get("changedValue") === "value");
    h.put("changedValue", "test値")
    assert(h.get("changedValue") === "test値");

    log(h);
    log("**All tests are completed**")
}

test();
