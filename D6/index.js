console.log("AOC 2017 - Day 6: Memory Reallocation");

const splitLines = (data) => data.split(/\s+/).map(Number);

const findMax = arr => {
    let max = 0;
    maxIndex = 0;
    arr.forEach((bank, index) => {
        if (bank > max) {
            max = bank;
            maxIndex = index;
        }
    })
    return [ max, maxIndex ];
};

const task1 = parBanks => {
    let banks = [ ...parBanks];
    const states = new Set();
    let steps = 0;
    while (true) {
        state = banks.toString();
        if (!states.has(state)) states.add(state);
        else return steps;
        let [ m, i ]  = findMax(banks);
        banks[i] = 0;
        while ( m > 0) {
            i = (i + 1) % banks.length;
            banks[i]++;
            m--;
        }
        steps++;
    }
};

const task2 = banks => {
    const states = new Set();
    let steps = 0;
    let repeated = null;
    let saveSteps;
    while (true) {
        state = banks.toString();
        if (repeated === state) return steps - saveSteps;
        if (!states.has(state)) states.add(state);
        else if (repeated === null) {
            repeated = state;
            saveSteps = steps;
        }
        let [ m, i ]  = findMax(banks);
        banks[i] = 0;
        while ( m > 0) {
            i = (i + 1) % banks.length;
            banks[i]++;
            m--;
        }
        steps++;
    }
}

let testdata = `0   2   7   0`;

inputdata = splitLines(inputdata);

console.log(inputdata);

testdata = splitLines(testdata);

console.log("");

doEqualTest(task1(testdata), 5);

console.log("Task 1: " + task1(inputdata));

console.log("");

doEqualTest(task2(testdata), 4);

console.log("Task 2: " + task2(inputdata));