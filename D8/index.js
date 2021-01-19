console.log("AOC 2017 - Day 8: I Heard You Like Registers");

const splitLines = (data) => data.split(String.fromCharCode(10));

const prepare = data => {
    const re = /(\w+) (inc|dec) (-?\d+) if (\w+) (>|>=|<|<=|==|!=) (-?\d+)/;
    let instructions = [];
    for (const line of data) {
        [, reg, op, amount, condReg, condOp, condN] = re.exec(line);
        instructions.push({ reg, op, amount: +amount, condReg, condOp, condN: +condN });
    }
    return instructions;
};

const task1And2 = instructions => {
    let regSet = new Set(instructions.flatMap(i => [i.reg, i.condReg]));
    const registers = {};
    for (const reg of regSet) {
        registers[reg] = 0;
    }
    let max = 0;
    for (const i of instructions) {
        let strToEval = registers[i.condReg] + i.condOp + i.condN;
        // warning: using eval is is evil! (but I dont want to write a long switch...)
        let condition = eval(strToEval);
        if (condition) {
            switch (i.op) {
                case "inc":
                    registers[i.reg] += i.amount;
                    break;
                case "dec":
                    registers[i.reg] -= i.amount;
                    break;
                default:
                    console.error("Wrong instruction");
            }
        }
        let actMax = Object.values(registers).max();
        if (actMax > max) max = actMax;
    }
    return [ Object.values(registers).max(), max ].toString();
};

let testdata = `b inc 5 if a > 1
a inc 1 if b < 5
c dec -10 if a >= 1
c inc -20 if c == 10`;

inputdata = prepare(splitLines(inputdata));

testdata = prepare(splitLines(testdata));

console.log("");

doEqualTest(task1And2(testdata), "1,10");

console.log("Task 1 & 2: " + task1And2(inputdata));
