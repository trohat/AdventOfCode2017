console.log("AOC 2017 - Day 18: Duet");

const splitLines = (data) => data.split(String.fromCharCode(10));

const prepare = data => {
    const re = /(\w{3}) (\w) ?(-?\w+)?/;
    const instructions = [];
    for (const line of data) {
        const [, inst, reg1, reg2] = re.exec(line);
        instructions.push({ inst, reg1, reg2 });
    }
    return instructions;
};

const task1 = instructions => {
    let registers = {};
    const valRe = /-?\d+/;
    for (const inst of instructions) {
        if (!valRe.test(inst.reg1)) registers[inst.reg1] = 0;
    }

    let played = null;
    for (let i = 0; i < instructions.length; i++) {
        let inst = instructions[i];
        let x = inst.reg1;
        let y;
        if (valRe.test(inst.reg2)) y = +inst.reg2;
        else y = +registers[inst.reg2];
        switch (inst.inst) {
            case "snd":
                if (valRe.test(i.reg1)) x = +inst.reg1;
                else x = +registers[inst.reg1];
                played = x;
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
                if (x !== 0) return played;
                break;
            case "jgz":
                if (valRe.test(i.reg1)) x = +inst.reg1;
                else x = +registers[inst.reg1];
                if (x > 0) i += y - 1;
                break;
            default:
                console.error("Wrong switch statement.");
        }
    }
    console.log(registers);

};

const task2 = data => {

}

let testdata = `set a 1
add a 2
mul a a
mod a 5
snd a
set a 0
rcv a
jgz a -1
set a 1
jgz a -2`;

inputdata = prepare(splitLines(inputdata));

testdata = prepare(splitLines(testdata));

console.log("");

doEqualTest(task1(testdata), 4);

console.log("Task 1: " + task1(inputdata));

console.log("");

//doEqualTest(task2(testdata), 336);

//console.log("Task 2: " + task2(inputdata));