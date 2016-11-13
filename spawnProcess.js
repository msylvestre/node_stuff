/**
 * Created by Fuel on 2016-11-02.
 */

const fs = require('fs');
const child_process = require('child_process');

for(var i = 0; i<1; i++) {
  var workerProcess = child_process.spawn('node', ['selenium.js', i]);

  workerProcess.stdout.on('data', function (data) {
    console.log('stdout: ' + data);
  });

  workerProcess.stderr.on('data', function (data) {
    console.log('stderr: ' + JSON.stringify(data));
  });

  workerProcess.on('close', function (code) {
    console.log('child process exited with code ' + code);
  });
}