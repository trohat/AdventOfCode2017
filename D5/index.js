console.log("AOC 2017 - Day 5: A Maze of Twisty Trampolines, All Alike");

const splitLines = (data) => data.split(String.fromCharCode(10));

const prepare = data => data.map(Number);

const task1 = pList => {
    const list = [ ...pList ];
    let position = 0;
    let steps = 0;
    while (true) {
        steps++;
        position += list[position]++;
        if (position < 0 || position >= list.length) return steps;
    }
};

const task2 = list => {
    let position = 0;
    let steps = 0;
    let offset;
    while (true) {
        steps++;
        offset = list[position];
        if (offset >= 3) list[position]--;
        else list[position]++;
        position += offset;
        if (position < 0 || position >= list.length) return steps;
    }
};

let testdata = `0
3
0
1
-3`;

inputdata = prepare(splitLines(inputdata));

testdata = prepare(splitLines(testdata));

console.log("");

doEqualTest(task1(testdata), 5);

console.log("Task 1: " + task1(inputdata));

console.log("");

doEqualTest(task2(testdata), 10);

console.log("Task 2: " + task2(inputdata));