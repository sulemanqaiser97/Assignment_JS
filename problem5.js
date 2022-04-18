const fetch = require('node-fetch');

const array = ["https://www.google.com", "https://www.facebook.com"];

// Implementation using callback
let fetchData_CallBack = function (array,callback) {
    array.forEach((element,index) =>{

        fetch(element)
        .then(response => {
           callback(array,index,response)
        })
        .catch(err => console.log("Unable to fetch " + element + " " + err));
    })
}

function setReponse(array,index,response){
    array[index] = response;
}

//fetchData_CallBack(aray,setReponse)


// Implementation using promises
let promises = [];
let fetchData_Promise = function (array) {
    array.forEach((element,index) =>{
            promises.push(
                fetch(element)
                .then(response => {
                    array[index]=response;
                })
                .catch(err => {console.log ("Unable to fetch " + element + " " + err)})
                )
            
        })
        return promises;
}


// const start = Date.now();
// Promise.all(fetchData_Promise(array))
// .then(() => {
//     console.log(array);
//     const duration = Date.now() - start;
//     console.log(duration)
// })





// Implementation using parallel execution

let fetchData = function (element,index) {
    
    return fetch(element)
    .then(response => {
        array[index]=response;
    })
    .catch(err => {console.log ("Unable to fetch " + element + " " + err)})
}


// const startp = Date.now();
// Promise.all(array.map((element,index)=>fetchData(element,index)))
// .then(() => {
//     console.log(array);
//     const duration = Date.now() - startp;
//     console.log(duration)
// })





//Implementation using async await
let fetchData_Async = async function(array) {

    for (const index in array) {
        let response = await fetch(array[index]);
        if (response.ok){
            array[index]= response;
        }
        else{
            console.log( "Unable to Fetch" + array[index])
        }
    }
    return array;
}



// fetchData_Async(array).then(reponse=>{
//     console.log(reponse)
// });
