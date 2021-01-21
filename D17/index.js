console.log("AOC 2017 - Day 17: Spinlock");

const task1 = forwardLength => {
    current = {
        value: 0,
    };
    current.next = current;
    for (let i = 1; i <= 2017; i++) {
        for (let j = 0; j < forwardLength; j++) {
            current = current.next;
        }

        current.next = {
            value: i,
            next: current.next
        };
        current = current.next;
    }

    return current.next.value;
};

const task2 = forwardLength => {
    current = {
        value: 0,
    };
    current.next = current;
    for (let i = 1; i <= 50000000; i++) {
        if (i % 1000000 === 0) console.log(i);
        for (let j = 0; j < forwardLength; j++) {
            current = current.next;
        }

        current.next = {
            value: i,
            next: current.next
        };
        current = current.next;
    }

    while (current.value !== 0) current = current.next;

    return current.next.value;
}

let testdata = 3;

console.log("");

doEqualTest(task1(testdata), 638);

console.log("Task 1: " + task1(inputdata));

console.log("");

//doEqualTest(task2(testdata), 336);

console.time();
console.log("Task 2: " + task2(inputdata));
console.timeEnd();