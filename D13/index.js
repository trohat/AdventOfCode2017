console.log("AOC 2017 - Day 13: Packet Scanners");

const splitLines = (data) => data.split(String.fromCharCode(10));

const prepare = data => {
    let firewall = [];
    for (const line of data) {
        [depth, range] = line.split(": ");
        firewall.push({ depth: +depth, range: +range, cycle: (range - 1) * 2 });
    }
    return firewall;
};

const task1 = firewall => {
    let severity = 0;
    for (const layer of firewall) {
        if (layer.depth % layer.cycle === 0) severity += layer.depth * layer.range;
    }
    return severity;
};

const task2 = firewall => {
    let delay = 0;
    main: while (true) {
        delay++;
        for (const layer of firewall) {
            if ((layer.depth + delay) % layer.cycle === 0) continue main;
        }
        return delay;
    }
}

let testdata = `0: 3
1: 2
4: 4
6: 4`;

inputdata = prepare(splitLines(inputdata));

console.log(inputdata);

testdata = prepare(splitLines(testdata));

console.log("");

doEqualTest(task1(testdata), 24);

console.log("Task 1: " + task1(inputdata));

console.log("");

doEqualTest(task2(testdata), 10);

console.time();
console.log("Task 2: " + task2(inputdata));
console.timeEnd();