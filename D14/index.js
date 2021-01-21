console.log("AOC 2017 - Day 14: Disk Defragmentation");

const prepareSequence = data => {
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

const createHash = sequenceOfLengths => {
    list = createList(256);

    let currentPosition = 0;
    let skipSize = 0;
    for (let i = 0; i < 64; i++) {
       [ list, currentPosition, skipSize ] = oneRound(list, sequenceOfLengths, currentPosition, skipSize);
    }
    
    let denseHash = "";
    while (list.length > 0) {
        let sparseHash = list.splice(0, 16);
        denseHash += sparseHash.reduce((acc, currentValue) => acc ^ currentValue).toString(2).padStart(8, '0');
    }

    return denseHash;
};

const countSquares = keyString => {
    let squaresUsed = 0;
    for (let i = 0; i < 128; i++) {
        let knotHash = prepareSequence(keyString + "-" + i);
        squaresUsed += createHash(knotHash).countChar("1");
    }
    return squaresUsed;
}

const defragment = keyString => {
    const dirs = [{ y: -1, x: 0 }, { y: 0, x: -1 }, { y: 0, x: 1 }, { y: 1, x: 0 }];

    const processRegion = (y, x, n) => {
        let squaresToProcess = [];
        squaresToProcess.push({x,y});
        while (squaresToProcess.length > 0) {
            let actSquare = squaresToProcess.shift();
            for (const dir of dirs) {
                let newX = actSquare.x + dir.x;
                let newY = actSquare.y + dir.y;
                if (disc[newY] && disc[newY][newX] && disc[newY][newX].value === 1 && !disc[newY][newX].region) {
                    disc[newY][newX].region = n;
                    squaresToProcess.push({ x: newX, y: newY});
                }
            }
        }
    };

    let disc = [];
    for (let i = 0; i < 128; i++) {
        let knotHash = prepareSequence(keyString + "-" + i);
        disc.push(createHash(knotHash));
    }
    disc = disc.map(line => line.split("").map(Number).map(v => ({ value: v })));

    lastRegionNumber = 0;
    disc.forEach((line, lineIndex) => {
        line.forEach((square, squareIndex) => {
            if (square.value === 1 && square.region === undefined) {
                lastRegionNumber++;
                square.region = lastRegionNumber;
                processRegion(lineIndex, squareIndex, lastRegionNumber);
            }
        });
    });
    return lastRegionNumber;
}

let testdata = `flqrgnkx`;

console.log("");

doEqualTest(countSquares(testdata), 8108);

console.log("Task 1: " + countSquares(inputdata));

console.log("");

doEqualTest(defragment(testdata), 1242);

console.log("Task 2: " + defragment(inputdata));