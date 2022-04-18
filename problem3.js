const sum  = function (a) {
    return function (b) {
      if (b){
        return sum(a+b); 
      }
      return a ;
      
    }
  };

let sum_ES6 = a => b => b ? sum(a+b) : a ;

console.log (sum(10)(20)(30)());