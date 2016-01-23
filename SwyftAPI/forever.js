var forever = require('forever-monitor');

var child = new (forever.Monitor)('app.js');

child.on('error', function (err) {
  console.log('Swyft Epsilon has encountered an error.\n');
  console.log(err);
});

child.on('restart', function () {
  console.log('Swyft Epsilon is restarting.');
});

child.on('exit', function (code) {
  console.log('Swyft Epsilon has exited with code: ' + code;
});

child.start();
