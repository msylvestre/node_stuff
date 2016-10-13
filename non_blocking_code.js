var fs = require("fs");

fs.readFile('input.txt', function (err, data) {
   if (err) return console.error(err);
   console.log(data.toString());
});

console.log("Program Ended");



console.log("-------------------- Example 2 ------------------");

// Code above is same as

var write_file_content = function (err, data) 
  {
     if (err) return console.error(err);
     console.log(data.toString());
  };

fs.readFile('input.txt',write_file_content);

console.log("Program Ended");
