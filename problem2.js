const fetch = require("node-fetch");

Array.prototype.populate = async function () {
  for (index = 0; index < this.length; index++) {
    let response = await fetch(this[index]);
    if (response.ok) {
      array[index] = response;
    } else {
      console.error("Unable to Fetch" + this[index]);
    }
  }
  return;
};

const array = ["https://www.google.com", "https://www.facebook.com"];
(async () => {
  await array.populate();
  console.log(array);
})();
