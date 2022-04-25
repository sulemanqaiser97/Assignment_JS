const fetch = require("node-fetch");

let memoizedData = {};

// implementation using Promises
let memoizedFetch = function (element) {
  if (memoizedData[element]) {
    return new Promise((resolve) => {
      resolve(memoizedData[element]);
    });
  } else {
    return fetch(element)
      .then((response) => {
        memoizedData[element] = response;
        return response;
      })
      .catch((err) => {
        return "Unable to fetch " + element + " " + err;
      });
  }
};

// implementation using Aysnc await
let memoizedFetchASync = async function (element) {
  if (memoizedData[element]) {
    return memoizedData[element];
  } else {
    let response = await fetch(element);
    if (response.ok) {
      memoizedData[element] = response;
      return response;
    }
    return "Unable to Fetch" + element;
  }
};

memoizedFetch("https://www.google.com").then((response) =>
  console.log(response)
);

memoizedFetchASync("https://www.google.com").then((response) =>
  console.log(response)
);
