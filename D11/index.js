console.log("AOC 2017 - Day 11: Hex Ed ");

const prepare = data => data.split(",");

const task = (path, task) => {
    let countDist = (x, y) => {
        let xPositive = Math.abs(x) === x;
        let yPositive = Math.abs(y) === y;
        if (xPositive === yPositive) return Math.abs(Math.max(x,y));
        else return Math.abs(x) + Math.abs(y);
    }

    let x = 0;
    let y = 0;
    let maxDist = 0;
    for (const step of path) {
        switch (step) {
            case "n":
                y -= 1;
                break;
            case "s":
                y += 1;
                break;
            case "sw":
                x -= 1;
                break;
            case "ne":
                x += 1;
                break;
            case "nw":
                x -= 1;
                y -= 1;
                break;
            case "se":
                y += 1;
                x += 1;
                break;
            default:
                console.error("Bad robot... wait, I mean bad direction!");
        }
        let dist = countDist(x,y);
        if (dist > maxDist) maxDist = dist;
    }
    
    if (task === "task2") return maxDist;
    return countDist(x, y);
};

let testdata1 = `ne,ne,ne`;
let testdata2 = `ne,ne,sw,sw`;
let testdata3 = `ne,ne,s,s`;
let testdata4 = `se,sw,se,sw,sw`;

inputdata = prepare(inputdata);

console.log(inputdata);

testdata1 = prepare(testdata1);
testdata2 = prepare(testdata2);
testdata3 = prepare(testdata3);
testdata4 = prepare(testdata4);

console.log("");

doEqualTest(task(testdata1), 3);
doEqualTest(task(testdata2), 0);
doEqualTest(task(testdata3), 2);
doEqualTest(task(testdata4), 3);

console.log("Task 1: " + task(inputdata));

console.log("");

console.log("Task 2: " + task(inputdata, "task2"));