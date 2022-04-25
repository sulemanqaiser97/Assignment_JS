const fetch = require("node-fetch");
const array = ["https://www.google.com", "https://www.facebook.com"];

// Implementation using callback
let fetchData_CallBack = function (array, callback) {
  array.forEach((element, index) => {
    fetch(element)
      .then((response) => {
        callback(null, array, index, response);
      })
      .catch((err) => callback(err));
  });
};

// Implementation using promises
let promises = [];
let fetchData_Promise = function (array) {
  array.forEach((element, index) => {
    promises.push(
      fetch(element)
        .then((response) => {
          array[index] = response;
        })
        .catch((err) => {
          console.error("Unable to fetch " + element + " " + err);
        })
    );
  });
  return promises;
};

// Implementation using parallel execution
let fetchData = function (element, index) {
  return fetch(element)
    .then((response) => {
      array[index] = response;
    })
    .catch((err) => {
      console.error("Unable to fetch " + element + " " + err);
    });
};

//Implementation using async await
let fetchData_Async = async function (array) {
  for (const index in array) {
    let response = await fetch(array[index]);
    if (response.ok) {
      array[index] = response;
    } else {
      console.error("Unable to Fetch" + array[index]);
    }
  }
  return array;
};
