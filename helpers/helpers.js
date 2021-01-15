// --- Arrays ---

Array.prototype.sum = function () {
    return this.reduce((a, b) => a + b, 0);
}

Array.prototype.max = function () {
    return Math.max(...this);
}

Array.prototype.min = function () {
    return Math.min(...this);
}

Array.prototype.countChar = function (char) {
    return this.reduce((accumulator, str) => accumulator + str.split(char).length - 1, 0);
}

Array.prototype.compare = function (arr2) {
    if (this.length !== arr2.length) return false;
    let same = true;
    this.forEach((field, index) => {
        if (field !== arr2[index]) same = false;
    })
    return same;
}

Array.prototype.intersection = function (arrB) {
    return this.filter(el => arrB.includes(el));
}

// sorted union with eliminated duplicates
Array.prototype.union = function (arrB) {
    return [...new Set([...this, ...arrB])].sort();
}

// --- Strings ---

// str.isupper()
String.prototype.isUpper = function () {
    return this.toUpperCase() == this;
}

// str.islower()
String.prototype.isLower = function () {
    return this.toLowerCase() == this;
}

String.prototype.countChar = function (char) {
    return this.split(char).length - 1;
}

String.prototype.setCharAt = function (index, char) {
    return this.substring(0, index) + char + this.substring(index + 1);
}

String.prototype.reverse = function() {
    return this.split("").reverse().join("");
}

// --- Others ---

let chr = String.fromCharCode;

let ord = str => str.charCodeAt(0);

// numpy.zeros()
const zeros = length => Array.from({ length }).map(() => 0);