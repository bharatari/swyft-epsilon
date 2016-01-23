var forever = require('forever-monitor');

var child = new (forever.Monitor)('app.js');

child.on('error', function () {
    console.log("Swyft Epsilon is restarting due to an error.");
});


child.start();
