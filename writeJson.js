
// Very good reference : https://www.codementor.io/nodejs/tutorial/how-to-use-json-files-in-node-js


var fs = require('fs');
var fileName = './file.json';
var file = require(fileName);

myApp = "BigCommerce";

file[myApp] =  {
  "id": 6,
  "environement": "prod",
  "url": "https://bc.com",
  "user": {
    "email": "tbd",
    "password": "<secret>"
  }
};

/*
Or if you know the name of the object to add to to the file you can use : 

file.BigCommerce =  {
  "id": 6,
  "environement": "prod",
  "url": "https://bc.com",
  "user": {
    "email": "tbd",
    "password": "<secret>"
  }
};


*/

// Display the "user" property of the object "venzee" from the json file.  It seems a "require" also load the file in memory, magie :D
console.log("------------------------------------------------\nGet the property file.venzee.user")
console.log(JSON.stringify(file.venzee.user, null, 2));
console.log("\n\n")


console.log("------------------------------------------------\nWrite the new item to the json file and display the whole file")

fs.writeFile(fileName, JSON.stringify(file, null, 2), function (err) {
  if (err) return console.log(err);
  console.log(JSON.stringify(file, null, 2));
  console.log('\n\nWriting to : ' + fileName);
});
