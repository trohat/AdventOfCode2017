console.log("AOC 2017 - Day 21: Fractal Art");

const splitLines = data => data.split(String.fromCharCode(10));

const prepare = input => {
    const twoTimesTwoRules = [];
    const threeTimesThreeRules = [];
    for (let line of input) {
        line = line.split("=>").map(l => l.trim().split("/"));
        let arrayToPush;
        if (line[0].length === 2) arrayToPush = twoTimesTwoRules;
        else  arrayToPush = threeTimesThreeRules;
        arrayToPush.push({ input: line[0], output: line[1]});
    }
    return [ twoTimesTwoRules, threeTimesThreeRules];
};

Array.prototype.pushEmptyLines = function(size) {
    for (let i = 0; i < size; i++) this.push("");
};

Array.prototype.fillLines = function(filler) {
    let fillerSize = filler.length;
    let arraySize = this.length;
    for (let i = 0; i < fillerSize; i++) {
        this[arraySize - fillerSize + i] += filler[i];
    }
};

const task = ([ twoTimesTwoRules, threeTimesThreeRules ], iterations) => {
    let grid = `.#.
    ..#
    ###`;
    grid = splitLines(grid).map(e => e.trim());
    
    for (let i = 0; i < iterations; i++) {
        let squareSize, rulesArray;
        if (grid.length % 2 === 0) {
            squareSize = 2;
            rulesArray = twoTimesTwoRules;
        }
        else {
            squareSize = 3;
            rulesArray = threeTimesThreeRules;
        }

        let newGrid = [];

        newGrid.pushEmptyLines(squareSize + 1);
        
        while(grid.length > 0) {
            let chunk = [];
            for (let j = 0; j < squareSize; j++) {
                chunk.push(grid[j].slice(0, squareSize));
                grid[j] = grid[j].slice(squareSize);
            }
            
            findRule: for (const rule of rulesArray) {
                for (let k = 0; k < 4; k++) {
                    if (chunk.compare(rule.input)) {
                        newGrid.fillLines(rule.output);
                        break findRule;
                    }
                    chunk = chunk.rotateRight();
                }
                
                chunk = chunk.flip();
                
                for (let k = 0; k < 4; k++) {
                    if (chunk.compare(rule.input)) {
                        newGrid.fillLines(rule.output);
                        break findRule;
                    }
                    chunk = chunk.rotateRight();
                }
            }

            if (grid[0] === "" && grid[grid.length-1] !== "") newGrid.pushEmptyLines(squareSize + 1);
            while (grid[0] === "") grid.shift();
        }

        grid = [ ...newGrid];
        if (iterations <= 5) console.table(grid);
        if (iterations > 5) console.log("Reached " + (i+1) + " iterations.");
    }
    return grid.countChar("#");
};

let testdata = `../.# => ##./#../...
.#./..#/### => #..#/..../..../#..#`;

inputdata = prepare(splitLines(inputdata));

console.log(inputdata);

testdata = prepare(splitLines(testdata));

console.log("");

doEqualTest(task(testdata, 2), 12);

console.log("Task 1: " + task(inputdata, 5));

console.log("");

console.log("Task 2: " + task(inputdata, 18));