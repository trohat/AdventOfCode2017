console.log("AOC 2017 - Day 2: Corruption Checksum");

Array.prototype.min = function () {
    return Math.min(...this);
}

Array.prototype.max = function () {
    return Math.max(...this);
}

const splitLines = (data) => data.split(String.fromCharCode(10));

const prepare = data => data.map(l => l.split(/\s+/).map(n => +n));

const task1 = spreadsheet => {
    let checksum = 0;
    for (const line of spreadsheet) {
        checksum += line.max() - line.min();
    }
    return checksum;
    
};

const task2 = spreadsheet => {
    let checksum = 0;
    for (const line of spreadsheet) {
        outer: for (const n1 of line) {
            for (const n2 of line) {
                if (n1 === n2) continue;
                if (n2 % n1 === 0) {
                    checksum += n2 / n1;
                    break outer;
                }
                if (n1 % n2 === 0)  {
                    checksum += n1 / n2;
                    break outer;
                }
            }
        }
    }
    return checksum;
}

let testdata = `5 9 2 8
9 4 7 3
3 8 6 5`;

inputdata = prepare(splitLines(inputdata));

console.log(inputdata);

testdata = prepare(splitLines(testdata));

console.log("");

doEqualTest(task1(testdata), 18);

console.log("Task 1: " + task1(inputdata));

console.log("");

doEqualTest(task2(testdata), 9);

console.log("Task 2: " + task2(inputdata));