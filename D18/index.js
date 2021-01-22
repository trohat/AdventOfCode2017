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

    let programs = [];
    let outputs = [[], []];
    let programStates = [ SENDING, SENDING ];
    for (let programID = 0; programID < 2; programID++) {
        programs.push(createProgramIterator(instructions, programID, null, outputs[1-programID]));
    }
    let programID = 0;
    let p1Sent = 0;
    let result;
    while (programStates[0] === SENDING || programStates[1] === SENDING) {
        result = programs[programID].next();
        if (result.done) programStates[programID] = FINISHED;
        else {
            programStates[programID] = result.value.state;
            if (programStates[programID] === SENDING) {
                outputs[programID].push(result.value.value);
                if (programID === 1) p1Sent++;
            }
        }
        programID = (programID + 1) % 2;
    }

    return p1Sent;
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