console.log("AOC 2017 - Day 16: Permutation Promenade");

const splitLines = (data) => data.split(",");

const createPrograms = amount => {
    let programs = [];
    for (let i = 0; i < amount; i++) {
        programs.push(chr(i + 97));
    }
    return programs;
};

const doMove = (programs, move) => {
    let first, second;
    switch (move[0]) {
        case "s":
            first = move.substring(1);
            let moving = programs.splice(programs.length - first);
            programs = moving.concat(programs);
            break;
        case "x":
            first = move.substring(1, move.indexOf("/"));
            second = move.substring(move.indexOf("/") + 1);
            let backup = programs[second];
            programs[second] = programs[first];
            programs[first] = backup;
            break;
        case "p":
            first = move[1];
            second = move[3];
            let secondPos = programs.indexOf(second);
            programs[programs.indexOf(first)] = second;
            programs[secondPos] = first;
            break;
        default:
            console.error("Unknown switch case.");
    }
    return programs;
}

const task1 = (dance, amount) => {
    let programs = createPrograms(amount);
    
    for (const move of dance) programs = doMove(programs, move);
    
    return programs.join("");
};

const task2 = (dance, amount) => {
    let programs = createPrograms(amount);
    let startState = programs.join("");
    let totalRepeats = 1000000000;

    for (let i = 0; i < totalRepeats; i++) {
        for (const move of dance) {
            programs = doMove(programs, move);
        }
        if (programs.join("") === startState) {
            let cycle = i + 1;
            let restRepeats = totalRepeats - i - 1;
            let times = Math.floor(restRepeats / cycle);
            i += cycle * times;
        }
    }

    return programs.join("");
};

let testdata = `s1,x3/4,pe/b`;

inputdata = splitLines(inputdata);

testdata = splitLines(testdata);

console.log("");

doEqualTest(task1(testdata, 5), "baedc");

console.log("Task 1: " + task1(inputdata, 16));

console.log("");

doEqualTest(task2(testdata, 5), "abcde");

console.time();
console.log("Task 2: " + task2(inputdata, 16));
console.timeEnd();