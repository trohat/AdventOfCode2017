console.log("AOC 2017 - Day 25: The Halting Problem");

const splitLines = (data) => data.split(String.fromCharCode(10));

const prepare = data => {
    let blueprint = {};

    let beginRe = /Begin in state (\w)./;
    let checksumRe = /Perform a diagnostic checksum after (\d+) steps./
    let emptyLine = /^\s*$/;
    let stateStart = /In state ([A-Z]):/;
    let valueStart = /If the current value is ([01]):/;
    let writeRe = /Write the value ([01])./;
    let moveRe = /Move one slot to the (right|left)./;
    let continueRe = /Continue with state ([A-Z])./;

    let currentState = null;
    let currentValue = null;
    let startState = null;
    let stepsToChecksum = null;

    for (const line of data) {
        if (beginRe.test(line)) {
            [ , startState] = beginRe.exec(line);
            continue;
        }
        if (checksumRe.test(line)) {
            [ , stepsToChecksum ] = checksumRe.exec(line);
            continue;
        }
        if (stateStart.test(line)) {
            [ , stateName ] = stateStart.exec(line);
            currentState = blueprint[stateName] = {};
            continue;
        }
        if (valueStart.test(line)) {
            [ , value ] = valueStart.exec(line);
            currentValue = currentState[value] = {};
            continue;
        }
        if (writeRe.test(line)) {
            [ , value ] = writeRe.exec(line);
            currentValue.write = +value;
            continue;
        }
        if (moveRe.test(line)) {
            [ , value ] = moveRe.exec(line);
            currentValue.move = value;
            continue;
        }
        if (continueRe.test(line)) {
            [ , value ] = continueRe.exec(line);
            currentValue.continue = value;
        }
    }

    return [ startState, +stepsToChecksum, blueprint ];
};

const task1 = ([ startState, stepsToChecksum, blueprint ]) => {
    let ones = new Set();
    let position = 0;
    let state = startState;
    for (let i = 0; i < stepsToChecksum; i++) {
        let instruction;
        if (ones.has(position)) instruction = blueprint[state][1];
        else instruction = blueprint[state][0];
        if (instruction.write === 1) ones.add(position);
        else ones.delete(position);
        if (instruction.move === "right") position++;
        else position--;
        state = instruction.continue;
    }

    return ones.size;
};

let testdata = `Begin in state A.
Perform a diagnostic checksum after 6 steps.

In state A:
  If the current value is 0:
    - Write the value 1.
    - Move one slot to the right.
    - Continue with state B.
  If the current value is 1:
    - Write the value 0.
    - Move one slot to the left.
    - Continue with state B.

In state B:
  If the current value is 0:
    - Write the value 1.
    - Move one slot to the left.
    - Continue with state A.
  If the current value is 1:
    - Write the value 1.
    - Move one slot to the right.
    - Continue with state A.`;

inputdata = prepare(splitLines(inputdata));

console.log(inputdata);

testdata = prepare(splitLines(testdata));

console.log(testdata);

console.log("");

doEqualTest(task1(testdata), 3);

console.log("Task 1: " + task1(inputdata));