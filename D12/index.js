console.log("AOC 2017 - Day 12: Digital Plumber");

const splitLines = (data) => data.split(String.fromCharCode(10));

const prepare = data => {
    const re = /(\d+) <-> ([\d, ]+)/;
    let connections = new Map();
    for (const line of data) {
        let [, program, others] = re.exec(line);
        others = others.split(",").map(Number);
        connections.set(+program, others);
    }
    return connections;
};

const task1 = connections => {
    let connected = new Set([0]);
    let toInspect = [0];
    while (toInspect.length > 0) {
        let inspecting = toInspect.shift();
        for (const searching of connections.get(inspecting)) {
            if (!connected.has(searching)) {
                connected.add(searching);
                toInspect.push(searching);
            }
        }
    }
    return connected.size;
};

const task2 = connections => {
    let groups = [];
    for (const [key, value] of connections) {
        let connected = [key, ...value];
        let myGroup;
        let found = false;
        for (const program of connected) {
            let groupsToDelete = [];
            for (const group of groups) {
                if (myGroup && myGroup === group) continue;
                if (group.includes(program)) {
                    if (!found) {
                        found = true;
                        myGroup = group;
                        group.push(...connected);
                    } else {
                        myGroup.push(...group);
                        groupsToDelete.push(group);
                    }
                    break;

                }
            }
            groups = groups.filter(g => !(groupsToDelete.includes(g)));
        }
        if (!found) groups.push(connected);

        // not necessary, actually makes code running slower
        //groups = groups.map(g => [ ... new Set(g)]);
    }

    return groups.length;
}

let testdata = `0 <-> 2
1 <-> 1
2 <-> 0, 3, 4
3 <-> 2, 4
4 <-> 2, 3, 6
5 <-> 6
6 <-> 4, 5`;

inputdata = prepare(splitLines(inputdata));

testdata = prepare(splitLines(testdata));

console.log("");

doEqualTest(task1(testdata), 6);

console.log("Task 1: " + task1(inputdata));

console.log("");

doEqualTest(task2(testdata), 2);

console.time();
console.log("Task 2: " + task2(inputdata));
console.timeEnd();