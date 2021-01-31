console.log("AOC 2017 - Day 24: Electromagnetic Moat");

const splitLines = (data) => data.split(String.fromCharCode(10));

const prepare = data => {
    let components = [];
    for (const line of data) {
        [ c1, c2 ] = line.split("/");
        components.push([ +c1, +c2 ]);
    }
    return components;
};

const task1 = components => {
    const findStrongest = (type, components) => {
        let strongest = 0;
        components.forEach((component, index) => {
            let fits = component.indexOf(type);
            if (fits !== -1) {
                const otherType = component[1 - fits];
                const filteredComponents = components.filter(c => c !== component);
                let bridgeStrength = findStrongest(otherType, filteredComponents);
                bridgeStrength += component[0] + component[1];
                if (bridgeStrength > strongest) strongest = bridgeStrength;
            }
        });
        return strongest;
    }
    
    return findStrongest(0, components);
};

const task2 = components => {
    const findbest = (type, components) => {
        let bestLength = 0;
        let bestStrength = 0;
        components.forEach((component, index) => {
            let fits = component.indexOf(type);
            if (fits !== -1) {
                const otherType = component[1 - fits];
                const filteredComponents = components.filter(c => c !== component);
                let [ bridgeLength, bridgeStrength ] = findbest(otherType, filteredComponents);
                bridgeLength += 2;
                bridgeStrength += component[0] + component[1];
                if (bridgeLength > bestLength || bridgeLength === bestLength && bridgeStrength > bestStrength) {
                    bestLength = bridgeLength;
                    bestStrength = bridgeStrength;
                };
            }
        });
        return [ bestLength, bestStrength ];
    }
    
    return findbest(0, components)[1];
};


let testdata = `0/2
2/2
2/3
3/4
3/5
0/1
10/1
9/10`;

inputdata = prepare(splitLines(inputdata));

testdata = prepare(splitLines(testdata));

console.log("");

doEqualTest(task1(testdata), 31);

console.log("Task 1: " + task1(inputdata));

console.log("");

doEqualTest(task2(testdata), 19);

console.log("Task 2: " + task2(inputdata));