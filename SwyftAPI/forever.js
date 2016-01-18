var forever = require('forever-monitor');

var child = new (forever.Monitor)('app.js');

child.on('error', function () {
  console.log('Swyft App is restarting due to an error.');
});


child.start();
