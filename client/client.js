var fs = require('fs');
var https = require('https');
var options = {
    hostname: '62.171.180.20',
    port: 4433,
    path: '/client',
    method: 'GET',
    key: fs.readFileSync('client1-key.pem'),
    cert: fs.readFileSync('client1-crt.pem'),
    ca: fs.readFileSync('ca-crt.pem'),
    rejectUnauthorized: false,
    requestCert: false
};


for (let i = 0; i < 30; i++) {

    var req = https.request(options, function(res) {
        res.on('data', function(data) {
            process.stdout.write(data);
        });

        setTimeout(function() {
            //console.log('timeout completed');
        }, 9000);

    });

    req.end();
    req.on('error', function(e) {
        console.error(e);
    });
}