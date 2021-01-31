console.log("AOC 2017 - Day 23: Coprocessor Conflagration");

const splitLines = (data) => data.split(String.fromCharCode(10));

const prepare = data => {
    const re = /(\w{3}) (\w) (-?\w+)/;
    const instructions = [];
    for (const line of data) {
        if (!re.test(line)) console.log(line);
        const [, inst, reg1, reg2] = re.exec(line);
        instructions.push({ inst, reg1, reg2 });
    }
    return instructions;
};

const task = (instructions, task) => {
    let registers = {};
    const valRe = /-?\d+/;
    for (const inst of instructions) {
        if (!valRe.test(inst.reg1)) registers[inst.reg1] = 0;
    }
    if (task === "task2") registers["a"] = 1;

    let steps = 0;
    let mulCount = 0;
    for (let i = 0; i < instructions.length; i++) {
        steps++;
        let inst = instructions[i];
        let x = inst.reg1;
        let y;
        if (valRe.test(inst.reg2)) y = +inst.reg2;
        else y = +registers[inst.reg2];
        switch (inst.inst) {
            case "set":
                registers[x] = y;
                break;
            case "sub":
                registers[x] -= y;
                break;
            case "mul":
                registers[x] *= y;
                mulCount++;
                break;
            case "jnz":
                if (valRe.test(i.reg1)) x = +inst.reg1;
                else x = +registers[inst.reg1];
                if (x !== 0) i += y - 1;
                break;
            default:
                console.error("Wrong switch statement.");
        }
        //if (i === 14) console.log(registers.d, registers.e); // step of setting f to 0
        //if (steps < 40) console.log("Steps:", steps, " i:", i, " a:", registers.a, " b:", registers.b, " c:", registers.c, " d:", registers.d, " e:", registers.e, " f:", registers.f, " g:", registers.g, " h:", registers.h);
        //if (steps > 50) break;

    }
    return mulCount;
};

const task2Cleverly = () => {
    let count = 0;
    for (let n = 109900; n <= 126900; n += 17) {
        let isPrime = true;
        let max = Math.floor(Math.sqrt(n));
        for (let j = 2; j <= max; j++) {
            if (n % j === 0) isPrime = false;
        }
        if (!isPrime) count++;
    }
    return count;
}

inputdata = prepare(splitLines(inputdata));

console.log("");

console.log("Task 1: " + task(inputdata));

console.log("");

console.log("Task 2: " + task2Cleverly());