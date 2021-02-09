console.log("AOC 2017 - Day 7: Recursive Circus");

const splitLines = (data) => data.split(String.fromCharCode(10));

const prepare = data => {
    const re = /(\w+) \((\d+)\)(?: -> ([a-z, ]+))?/;
    const tower = {};
    const parents = {};
    for (const line of data) {
        let [ , name, weight, above ] = re.exec(line);
        if (above) { 
            above = above.split(", ");
            for (const child of above) parents[child] = name;
        }
        tower[name] = { weight: +weight, above, totalWeight: null };
    }
    return [ tower, parents ];
};

const task1 = ([ tower, parents ]) => {
    let any = Object.keys(tower)[0];
    while(true) {
        if (any in parents) any = parents[any];
        else return any;
    }
};

// just found the wrong discs, done the selection and counting manually
const task2 = ([ tower ], root) => {
    console.log(tower);
    const countAndCompareTotal = disc => {
        tower[disc].totalWeight = tower[disc].weight;
        let above = tower[disc].above;
        if (above) {
            let weightToCompare;
            for (const aboveDisc of above) {
                if (!tower[aboveDisc].totalWeight) tower[aboveDisc].totalWeight = countAndCompareTotal(aboveDisc);
                tower[disc].totalWeight += tower[aboveDisc].totalWeight;
                weightToCompare = tower[aboveDisc].totalWeight;
            }
            for (const aboveDisc of above) {
                if (tower[aboveDisc].totalWeight !== weightToCompare) {
                    console.log("Problem at " + disc + " and " + aboveDisc);
                    console.log("Maybe " + aboveDisc + " should be " + (tower[aboveDisc].weight + weightToCompare - tower[aboveDisc].totalWeight));
                    console.log(tower[aboveDisc].totalWeight - weightToCompare);
                }
                //weightToCompare = tower[aboveDisc].totalWeight;
            }
        }
        return tower[disc].totalWeight;
    } 

    countAndCompareTotal(root);
}

let testdata = `pbga (66)
xhth (57)
ebii (61)
havc (66)
ktlj (57)
fwft (72) -> ktlj, cntj, xhth
qoyq (66)
padx (45) -> pbga, havc, qoyq
tknk (41) -> ugml, padx, fwft
jptl (61)
ugml (68) -> gyxo, ebii, jptl
gyxo (61)
cntj (57)`;

inputdata = prepare(splitLines(inputdata));

console.log(inputdata);

testdata = prepare(splitLines(testdata));

console.log("");

let testroot, root;

doEqualTest(testroot = task1(testdata), "tknk");

console.log("Task 1: " + (root = task1(inputdata)));

console.log("");

doEqualTest(task2(testdata, testroot), undefined);

console.log("Task 2: " + task2(inputdata, root)); 