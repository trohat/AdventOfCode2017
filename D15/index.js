console.log("AOC 2017 - Day 15: Dueling Generators");

const task1 = ([a, b]) => {
    let judge = 0;
    for (let i = 0; i < 40000000; i++) {
        a *= 16807;
        b *= 48271;
        a %= 2147483647;
        b %= 2147483647;
        if ((a & 65535) === (b & 65535)) judge++;
    }
    return judge;
};

const task2 = ([a, b]) => {
    let judge = 0;
    for (let i = 0; i < 5000000; i++) {
        do {
            a *= 16807;
            a %= 2147483647;
        } while (a % 4 !== 0);
        do {
            b *= 48271;
            b %= 2147483647;
        } while (b % 8 !== 0);
        if ((a & 65535) === (b & 65535)) judge++;
    }
    return judge;
};

let testdata = [ 65, 8921 ];

console.log("");

doEqualTest(task1(testdata), 588);

console.log("Task 1: " + task1(inputdata));

console.log("");

doEqualTest(task2(testdata), 309);

console.log("Task 2: " + task2(inputdata));