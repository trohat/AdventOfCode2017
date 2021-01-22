console.log("AOC 2017 - Day 18: Duet");

const splitLines = (data) => data.split(String.fromCharCode(10));

const prepare = data => {
    const re = /(\w{3}) (\w) ?(-?\w+)?/;
    const instructions = [];
    for (const line of data) {
        const [, inst, reg1, reg2] = re.exec(line);
        instructions.push([inst, reg1, reg2 ]);
    }
    return instructions;
};

const SENDING = "sending";
const WAITING = "waiting";
const FINISHED = "finished";

const createProgramIterator = function* (instructions, programID, task, inputField) {
    let registers = {};
    const valRe = /-?\d+/;
    for (const inst of instructions) {
        if (!valRe.test(inst[1])) registers[inst[1]] = 0;
    }
    registers["p"] = programID;

    const valOrReg = (instruction, n) => {
        if (valRe.test(instruction[n])) return +instruction[n];
        return +registers[instruction[n]];
    }
    let played = null;
    for (let i = 0; i < instructions.length; i++) {
        let inst = instructions[i];
        let x = inst[1];
        let y;
        y = valOrReg(inst, 2);
        switch (inst[0]) {
            case "snd":
                x = valOrReg(inst,1);
                if (task === "task1") played = x;
                else yield ({ state: SENDING, value: x});
                break;
            case "set":
                registers[x] = y;
                break;
            case "add":
                registers[x] += y;
                break;
            case "mul":
                registers[x] *= y;
                break;
            case "mod":
                registers[x] %= y;
                break;
            case "rcv":
                if (x !== "0") {
                    if (task === "task1") return played;
                    else {
                        while (inputField.length === 0) yield ({ state: WAITING});
                        registers[x] = inputField.shift();
                    }
                }
                break;
            case "jgz":
                x = valOrReg(inst,1)
                if (x > 0) i += y - 1;
                break;
            default:
                console.error("Wrong switch statement.");
        }
    }
};

const task1 = instructions => {
    let program = createProgramIterator(instructions, 0, "task1");
    return program.next().value;
};

const task2 = instructions => {
    let p0outputs = [];
    let p1outputs = [];
    let program0 = createProgramIterator(instructions, 0, null, p1outputs);
    let program1 = createProgramIterator(instructions, 1, null, p0outputs);
    let p0state = SENDING;
    let p1state = SENDING;
    let program1Sent = 0;
    let result;
    while (p0state === SENDING || p1state === SENDING) {
        result = program0.next();
        if (result.done) p0state = FINISHED;
        else {
            p0state = result.value.state;
            if (p0state === SENDING) p0outputs.push(result.value.value);
        }
        result = program1.next();
        if (result.done) p1state = FINISHED;
        else {
            p1state = result.value.state;
            if (p1state === SENDING) {
                p1outputs.push(result.value.value);
                program1Sent++;
            }
        }
    }

    return program1Sent;
};


let testdata0 = `set a 1
add a 2
mul a a
mod a 5
snd a
set a 0
rcv a
jgz a -1
set a 1
jgz a -2`;

let testdata1 = `snd 1
snd 2
snd p
rcv a
rcv b
rcv c
rcv d`;

inputdata = prepare(splitLines(inputdata));

testdata0 = prepare(splitLines(testdata0));
testdata1 = prepare(splitLines(testdata1));

console.log("");

doEqualTest(task1(testdata0), 4);

console.log("Task 1: " + task1(inputdata));

console.log("");

doEqualTest(task2(testdata1), 3);

console.log("Task 2: " + task2(inputdata));