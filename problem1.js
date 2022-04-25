// function takes in any number of argument and returns sum of all
const sum = (...arg) => arg.reduce((x, y) => x + y);
console.log(sum(1, 2, 38));
