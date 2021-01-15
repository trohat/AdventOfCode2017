console.log("AOC 2017 - Day 4: High-Entropy Passphrases");

Array.prototype.compare = function(arr) {
    if (this.length !== arr.length) return false;
    let same = true;
    this.forEach((field, index) => {
        if (field !== arr[index]) same = false;
    })
    return same;
};

const splitLines = (data) => data.split(String.fromCharCode(10));

const prepare = data => data.map(l => l.split(/\s/));

const task1 = list => {
    let validPassphrases = 0;
    for (const line of list) {
        let set = new Set(line);
        if (set.size === line.length) validPassphrases++;
    }
    return validPassphrases;
};

const task2 = list => {
    let validPassphrases = 0;
    for (const line of list) {
        let valid = true;
        line.forEach((word1, index1) => {
            let arr1 = [ ... word1];
            arr1.sort();
            line.forEach((word2, index2) => {
                if (index1 === index2) return;
                let arr2 = [ ... word2];
                arr2.sort();
                if (arr1.compare(arr2)) valid = false;
            });
        });
        if (valid) validPassphrases++;
    }
    return validPassphrases;
};

let testdata1 = `aa bb cc dd ee
aa bb cc dd aa
aa bb cc dd aaa`;

let testdata2 = `abcde fghij
abcde xyz ecdab
a ab abc abd abf abj
iiii oiii ooii oooi oooo
oiii ioii iioi iiio`;

inputdata = prepare(splitLines(inputdata));

console.log(inputdata);

testdata1 = prepare(splitLines(testdata1));
testdata2 = prepare(splitLines(testdata2));

console.log("");

doEqualTest(task1(testdata1), 2);

console.log("Task 1: " + task1(inputdata));

console.log("");

doEqualTest(task2(testdata2), 3);

console.log("Task 2: " + task2(inputdata));