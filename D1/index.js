console.log("AOC 2017 - Day 1: Inverse Captcha");

const prepare = data => data;

const task1 = captcha => {
    let sum = 0;
    for (let i = 1; i < captcha.length; i++) {
        if (captcha[i-1] === captcha[i]) sum += +captcha[i];
    }
    if (captcha[captcha.length-1] === captcha[0]) sum += +captcha[0];

    return sum;
};

const task2 = captcha => {
    let sum = 0;
    let half = captcha.length / 2;
    for (let i = 0; i < half; i++) {
        if (captcha[i] === captcha[i+half]) sum += 2 * +captcha[i];
    }

    return sum;
}

let testdata1 = `91212129`;
let testdata2 = `123123`;

console.log("");

doEqualTest(task1(testdata1), 9);

console.log("Task 1: " + task1(inputdata));

console.log("");

doEqualTest(task2(testdata2), 12);

console.log("Task 2: " + task2(inputdata));