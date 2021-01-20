console.log("AOC 2017 - Day 10: Knot Hash");

const prepare = data => data.split(",").map(Number);

const prepare2 = data => {
    let arr = [];
    for (const char of data) arr.push(ord(char));
    arr.push(17, 31, 73, 47, 23);
    return arr;
};

const createList = listSize => {
    let list = [];
    for (let i = 0; i < listSize; i++) {
        list.push(i);
    }
    return list;
};

const oneRound = (list, sequenceOfLengths, currentPosition, skipSize) => {
    const listSize = list.length;

    for (const len of sequenceOfLengths) {
        if (currentPosition + len <= listSize) {
            let toReverse = list.splice(currentPosition, len);
            toReverse.reverse();
            list.splice(currentPosition, 0, ...toReverse);
        } else {
            let fromEnd = listSize - currentPosition;
            let fromBegin = len - fromEnd;

            let endPart = list.splice(currentPosition);
            let beginPart = list.splice(0, fromBegin);
            
            let toReverse = [ ...endPart, ...beginPart ];
            toReverse.reverse();

            let toBegin = toReverse.splice(fromEnd);
            list.splice(0, 0, ...toBegin);
            list = list.concat(toReverse);
        }

        currentPosition = (currentPosition + len + skipSize) % listSize;
        skipSize++;
    }

    return [ list, currentPosition, skipSize] ;
};

const task1 = (sequenceOfLengths, listSize) => {
    list = createList(listSize);
    list = oneRound(list, sequenceOfLengths, 0, 0)[0];
    return list[0] * list[1];
};

const task2 = sequenceOfLengths => {
    list = createList(256);

    let currentPosition = 0;
    let skipSize = 0;
    for (let i = 0; i < 64; i++) {
       [ list, currentPosition, skipSize ] = oneRound(list, sequenceOfLengths, currentPosition, skipSize);
    }
    let denseHash = "";

    while (list.length > 0) {
        let sparseHash = list.splice(0, 16);
        denseHash += sparseHash.reduce((acc, currentValue) => acc ^ currentValue).toString(16).padStart(2, '0');
    }

    return denseHash;
};

let testdata = `3, 4, 1, 5`;
let testdata1 = ``;
let testdata2 = `AoC 2017`;
let testdata3 = `1,2,3`;
let testdata4 = `1,2,4`;

inputdata = prepare(inputdata);
inputdata2 = prepare2(inputdata2);

testdata = prepare(testdata);

testdata1 = prepare2(testdata1);
testdata2 = prepare2(testdata2);
testdata3 = prepare2(testdata3);
testdata4 = prepare2(testdata4);

console.log("");

doEqualTest(task1(testdata, 5), 12);

console.log("Task 1: " + task1(inputdata, 256));

console.log("");

doEqualTest(task2(testdata1), "a2582a3a0e66e6e86e3812dcb672a272");
doEqualTest(task2(testdata2), "33efeb34ea91902bb2f59c9920caa6cd");
doEqualTest(task2(testdata3), "3efbe78a8d82f29979031a4aa0b16a9d");
doEqualTest(task2(testdata4), "63960835bcdc130f0b66d7ff4f6a5a8e")//;

console.log("Task 2: " + task2(inputdata2));