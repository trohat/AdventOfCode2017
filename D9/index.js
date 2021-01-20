console.log("AOC 2017 - Day 9: Stream Processing");

const task = (stream, task) => {
    let len = stream.length;
    let openGroups = 0;
    let groups = 0;
    let escape = false;
    let isGarbage = false;
    let garbage = 0;
    let score = 0;
    for (const char of stream) {
        if (escape) {
            escape = false;
            continue;
        }
        if (char === "!") { 
            escape = true;
            continue;
        }
        if (char === "<") {
            if (isGarbage) garbage++;
            isGarbage = true;
            continue;
        }
        if (isGarbage) {
            if (char === ">") isGarbage = false;
            else garbage++;
            continue;
        }
        if (char === "{") openGroups++;
        if (char === "}") {
            score += openGroups; 
            openGroups--;
            groups++;
        }
    }
    console.assert(openGroups === 0);

    if (task === "task1") return score;
    if (task === "task2") return garbage;
    return groups;
};

let testdata1 = `{}`;
let testdata2 = `{{{}}}`;
let testdata3 = `{{},{}}`;
let testdata4 = `{{{},{},{{}}}}`;
let testdata5 = `{<{},{},{{}}>}`;
let testdata6 = `{<a>,<a>,<a>,<a>}`;
let testdata7 = `{{<a>},{<a>},{<a>},{<a>}}`;
let testdata8 = `{{<!>},{<!>},{<!>},{<a>}}`;

let testdata11 = `{}`;
let testdata12 = `{{{}}}`;
let testdata13 = `{{},{}}`;
let testdata14 = `{{{},{},{{}}}}`;
let testdata15 = `{<a>,<a>,<a>,<a>}`;
let testdata16 = `{{<ab>},{<ab>},{<ab>},{<ab>}}`;
let testdata17 = `{{<!!>},{<!!>},{<!!>},{<!!>}}`;
let testdata18 = `{{<a!>},{<a!>},{<a!>},{<ab>}}`;

let testdata21 = `<>`;
let testdata22 = `<random characters>`;
let testdata23 = `<<<<>`;
let testdata24 = `<{!>}>`;
let testdata25 = `<!!>`;
let testdata26 = `<!!!>>`;
let testdata27 = `<{o"i!a,<{i<a>`;

console.log("");

doEqualTest(task(testdata1), 1);
doEqualTest(task(testdata2), 3);
doEqualTest(task(testdata3), 3);
doEqualTest(task(testdata4), 6);
doEqualTest(task(testdata5), 1);
doEqualTest(task(testdata6), 1);
doEqualTest(task(testdata7), 5);
doEqualTest(task(testdata8), 2);

doEqualTest(task(testdata11, "task1"), 1);
doEqualTest(task(testdata12, "task1"), 6);
doEqualTest(task(testdata13, "task1"), 5);
doEqualTest(task(testdata14, "task1"), 16);
doEqualTest(task(testdata15, "task1"), 1);
doEqualTest(task(testdata16, "task1"), 9);
doEqualTest(task(testdata17, "task1"), 9);
doEqualTest(task(testdata18, "task1"), 3);

doEqualTest(task(testdata21, "task2"), 0);
doEqualTest(task(testdata22, "task2"), 17);
doEqualTest(task(testdata23, "task2"), 3);
doEqualTest(task(testdata24, "task2"), 2);
doEqualTest(task(testdata25, "task2"), 0);
doEqualTest(task(testdata26, "task2"), 0);
doEqualTest(task(testdata27, "task2"), 10);

console.log("");

console.log("Task 1: " + task(inputdata, "task1"));

console.log("");

console.log("Task 2: " + task(inputdata, "task2"));