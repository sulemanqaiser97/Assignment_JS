// function takes in a single argument and return a function which expects
// an argument. if argument is given, it will recursively call sum function
// otherwise return sum of arguments.
const sum = function (a) {
  return function (b) {
    if (b) {
      return sum(a + b);
    }
    return a;
  };
};

// same approach implemented through ES6 syntax
let sum_ES6 = (a) => (b) => b ? sum(a + b) : a;

console.log(sum(10)(20)(30)());
