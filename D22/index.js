console.log("AOC 2017 - Day 22: Sporifica Virus");

const splitLines = (data) => data.split(String.fromCharCode(10));

const turnsRight = new Map([[ "up", "right"], [ "right", "down"], [ "down", "left"], [ "left", "up" ]]);

const turnsLeft = new Map([[ "up", "left"], [ "left", "down"], [ "down", "right"], [ "right", "up" ]]);

const dirs = new Map([["left", { x: -1, y: 0 }], ["right", { x: 1, y: 0 }], ["up", { x: 0, y: -1 }], ["down", { x: 0, y: 1 }]]);

const task1 = (map, iterations) => {
    let size = map.length;
    middle = Math.floor(size/2);

    let infected = new Set();
    map.forEach((line, lineIndex) => {
        line.split("").forEach((field, fieldIndex) => {
            if (field === "#") infected.add([ lineIndex - middle, fieldIndex - middle ].toString());
        });
    });

    let virusCarrierX = virusCarrierY = 0;
    let virusCarrierDir = "up";

    let newInfections = 0;

    for (let i = 0; i < iterations; i++) {
        let coords = [ virusCarrierY, virusCarrierX ].toString();
        if (infected.has(coords)) {
            infected.delete(coords);
            virusCarrierDir = turnsRight.get(virusCarrierDir);
        } else {
            infected.add(coords);
            virusCarrierDir = turnsLeft.get(virusCarrierDir);
            newInfections++;
        } 
        virusCarrierX += dirs.get(virusCarrierDir).x;
        virusCarrierY += dirs.get(virusCarrierDir).y;
    }

    return newInfections;
};

const task2 = (map, iterations) => {
    let size = map.length;
    middle = Math.floor(size/2);

    let infected = new Set();
    map.forEach((line, lineIndex) => {
        line.split("").forEach((field, fieldIndex) => {
            if (field === "#") infected.add([ lineIndex - middle, fieldIndex - middle ].toString());
        });
    });

    let virusCarrierX = virusCarrierY = 0;
    let virusCarrierDir = "up";
    let weakened = new Set();
    let flagged = new Set();

    let newInfections = 0;

    for (let i = 0; i < iterations; i++) {
        let coords = [ virusCarrierY, virusCarrierX ].toString();
        if (infected.has(coords)) {
            infected.delete(coords);
            flagged.add(coords);
            virusCarrierDir = turnsRight.get(virusCarrierDir);
        } else if (flagged.has(coords)) {
            flagged.delete(coords);
            virusCarrierDir = turnsRight.get(turnsRight.get(virusCarrierDir));
        } else if(weakened.has(coords)) {
            weakened.delete(coords);
            infected.add(coords);
            newInfections++;
        } else {
            virusCarrierDir = turnsLeft.get(virusCarrierDir);
            weakened.add(coords);
        }

        virusCarrierX += dirs.get(virusCarrierDir).x;
        virusCarrierY += dirs.get(virusCarrierDir).y;
    }

    return newInfections;
};


let testdata = `..#
#..
...`;

inputdata = splitLines(inputdata);

testdata = splitLines(testdata);

console.log("");

doEqualTest(task1(testdata, 7), 5);
doEqualTest(task1(testdata, 70), 41);
doEqualTest(task1(testdata, 10000), 5587);

console.log("Task 1: " + task1(inputdata, 10000));

console.log("");

doEqualTest(task2(testdata, 100), 26);
doEqualTest(task2(testdata, 10000000), 2511944);

console.log("Task 2: " + task2(inputdata, 10000000));