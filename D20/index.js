console.log("AOC 2017 - Day 20: Particle Swarm");

const splitLines = (data) => data.split(String.fromCharCode(10));

const prepare = data => {
    const re = /\w=<(-?\d+),(-?\d+),(-?\d+)>/g;
    const particles = [];
    let helpArr;
    for (const line of data) {
        let particle = [];
        while(helpArr = re.exec(line)) {
            let [ , x,y,z] = helpArr;
            particle.push([+x,+y,+z]);
        }
        particles.push(particle);
    }
    return particles;
};

const countManhattan = particle => Math.abs(particle[0][0]) + Math.abs(particle[0][1]) + Math.abs(particle[0][2]);

const task1 = (pparticles, repeats) => {
    const particles = JSON.parse(JSON.stringify(pparticles));
    for (let i = 0; i < repeats; i++) {
        for (const particle of particles) {
            for (let axis = 0; axis < 3; axis++) {
                particle[1][axis] += particle[2][axis];
                particle[0][axis] += particle[1][axis];
            }
        }
    }
    let closestDistance = 10e10;
    let closestParticle = null;
    particles.forEach((particle, index) => {
        let manhattan = countManhattan(particle);
            if (manhattan < closestDistance) {
                closestDistance = manhattan;
                closestParticle = index;
            }
    });
    return closestParticle;
};

const task2 = (particles, repeats) => {
    const isCollision = (p1, p2) => p1[0][0] === p2[0][0] && p1[0][1] === p2[0][1] && p1[0][2] === p2[0][2];

    for (let i = 0; i < repeats; i++) {
        for (const particle of particles) {
            for (let axis = 0; axis < 3; axis++) {
                particle[1][axis] += particle[2][axis];
                particle[0][axis] += particle[1][axis];
            }
        }
        particles.sort((p1, p2) => countManhattan(p1) - countManhattan(p2));
        let toDelete = new Set();
        particles.forEach((p1, index) => {
            let myManhattan = countManhattan(p1);
            for (let j = index + 1; j < particles.length; j++) {
                let p2 = particles[j];
                if (countManhattan(p2) !== myManhattan) break;
                if (isCollision(p1,p2)) {
                    toDelete.add(p1).add(p2);
                    //console.log(index, p1[0])
                    //console.log(j,  p2[0])
                }
            }
        });
        //console.log("Step " + i + ".");
        //console.log("Deleting " + toDelete.size + " particles.");
        particles = particles.filter(p => !toDelete.has(p));
        //console.log("Currently we have " + particles.length + " particles.");
    }
    return particles.length;
}

let testdata1 = `p=<3,0,0>, v=<2,0,0>, a=<-1,0,0>    -4 -3 -2 -1  0  1  2  3  4
p=<4,0,0>, v=<0,0,0>, a=<-2,0,0>`;

let testdata2 = `p=<-6,0,0>, v=<3,0,0>, a=<0,0,0>    
p=<-4,0,0>, v=<2,0,0>, a=<0,0,0>    -6 -5 -4 -3 -2 -1  0  1  2  3
p=<-2,0,0>, v=<1,0,0>, a=<0,0,0>    (0)   (1)   (2)            (3)
p=<3,0,0>, v=<-1,0,0>, a=<0,0,0>`;

inputdata = prepare(splitLines(inputdata));

testdata1 = prepare(splitLines(testdata1));
testdata2 = prepare(splitLines(testdata2));

console.log("");

doEqualTest(task1(testdata1, 5), 0);

console.log("Task 1: " + task1(inputdata, 500));

console.log("");

doEqualTest(task2(testdata2, 2), 1);

console.log("Task 2: " + task2(inputdata, 100));