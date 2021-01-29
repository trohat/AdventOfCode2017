console.log("AOC 2017 - Day 19: A Series of Tubes");

const splitLines = (data) => data.split(String.fromCharCode(10));

const dirs = new Map([["left", { x: -1, y: 0 }], ["right", { x: 1, y: 0 }], ["up", { x: 0, y: -1 }], ["down", { x: 0, y: 1 }]]);

const horizontalDirs = ["left", "right"];

const verticalDirs = ["up", "down"];

const turns = new Map([["down", horizontalDirs], ["up", horizontalDirs], ["right", verticalDirs], ["left", verticalDirs]]);


const task = (diagram, task) => {
    if (!task) diagram.shift();
    let meY = 0;
    let meX = diagram[0].indexOf("|");
    let meDir = "down";
    let collectedLetters = "";
    let finished = false;

    const turn = meDir => {
        let newDir = null;  
        for (const dir of turns.get(meDir)) {
            let step = dirs.get(dir);
            if ((meY + step.y) in diagram && diagram[meY + step.y][meX + step.x] !== " " && diagram[meY + step.y][meX + step.x] !== undefined) {
                newDir = dir;
                break;
            }
        }
        return newDir;
    };

    let steps = 0; // for task 2
    while (!finished) {
        let step = dirs.get(meDir);
        meY += step.y;
        meX += step.x;
        steps++;
        if (meY < 0 || meY >= diagram.length || meX < 0 || meX >= diagram[meY].length) break;
        let field = diagram[meY][meX];
        if (field === " ") break;
        if (/[A-Z]/.test(field)) collectedLetters += field;
        if (field === "+") meDir = turn(meDir);
    }

    //console.log("Finished at " + (meY + 2) + ", " + (meX + 1) + ".");

    if (task === "task2") return steps;
    return collectedLetters;
};

let testdata = `
    |          
    |  +--+    
    A  |  C    
F---|----E|--+ 
    |  |  |  D 
    +B-+  +--+ 
`;

inputdata = splitLines(inputdata);

testdata = splitLines(testdata);

console.log("");

doEqualTest(task(testdata), "ABCDEF");

console.log("Task 1: " + task(inputdata));

console.log("");

doEqualTest(task(testdata, "task2"), 38);

console.log("Task 2: " + task(inputdata, "task2"));