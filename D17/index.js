console.log("AOC 2017 - Day 17: Spinlock");

const task1 = forwardLength => {
    current = {
        value: 0,
    };
    current.next = current;
    current.prev = current;
    for (let i = 1; i <= 2017; i++) {
        for (let j = 0; j < forwardLength; j++) {
            current = current.next;
        }

        current.next = {
            value: i,
            prev: current,
            next: current.next
        };
        current = current.next;
        current.next.prev = current;
    }

    return current.next.value;
};

const task2 = data => {
    
}

let testdata = 3;

console.log("");

doEqualTest(task1(testdata), 638);

console.log("Task 1: " + task1(inputdata));

console.log("");

//doEqualTest(task2(testdata), 336);

//console.log("Task 2: " + task2(inputdata));