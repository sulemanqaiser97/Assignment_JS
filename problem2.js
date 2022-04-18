const fetch = require('node-fetch');

Array.prototype.populate = function(){

    this.forEach((element,index) => {

        fetch(element)
        .then(response => this[index] = response)
        .catch(err => console.log ("Unable to fetch " + element + " " + err));
    });


}

const array = ["https://www.google.com", "https://www.facebook.com"];

array.populate();

setTimeout(() => {
    console.log(array)
}, 5000);
