/**
 * Created by Fuel on 2016-11-02.
 */

/*
try {
  var errr = new Error("message de marde");
  throw errr;

}
catch(e){
  console.log("ErM: " + e.message);
}
*/

const fs = require('fs');
const child_process = require('child_process');

for(var i=0; i<1; i++) {
  var workerProcess = child_process.exec('node selenium.js '+i,function(error, stdout, stderr) {

    if (error) {
      console.log('------------------------------------------------');
      console.log('Error Message Mss: ' + JSON.stringify(stderr));
      console.log('------------------------------------------------');
      console.log('Error code: '+error.code);
      console.log('Signal received: '+error.signal);
    }
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
  });

  workerProcess.on('exit', function (code) {
    console.log('Child process exited with exit code ' + code);
  });
}
