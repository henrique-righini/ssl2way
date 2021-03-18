var fs = require('fs');
var https = require('https');

// é tipo um hash do cert publico do cliente autorizado
const FINGERPRINTSET = ['4D:0B:A4:7E:67:A2:6B:D7:64:CE:F9:FE:3D:30:38:95:75:B6:8E:D9'];

var options = {
    hostname: '62.171.180.20',
    port: 4433,
    path: '/client',
    method: 'GET',
    key: fs.readFileSync('client1-key.pem'),
    cert: fs.readFileSync('client1-crt.pem'),
    ca: fs.readFileSync('ca-crt.pem'),
    rejectUnauthorized: false,
    requestCert: true
};



for (let i = 0; i < 24; i++) {
    var req = https.request(options, function(res) {

        var fingerprint = req.socket.getPeerCertificate().fingerprint;
        console.log(fingerprint)

        if (FINGERPRINTSET.indexOf(fingerprint) != -1) {
            console.log("Server Correto \n")
            console.log("------------- \n")
            console.log(new Date() + ' ' +
                "------------- \n" +
                req.connection.remoteAddress + ' ' +
                "------------- \n" +
                req.socket.getPeerCertificate().subject.CN + ' ' +
                "------------- \n" +
                req.method + ' ' + req.url +
                "------------- \n");

            res.on('data', function(data) {
                process.stdout.write(data);
            });

        } else {
            console.log("Server Errado \n")
            console.log("------------- \n")
            console.log(new Date() + ' ' +
                "------------- \n" +
                req.connection.remoteAddress + ' ' +
                "------------- \n" +
                req.socket.getPeerCertificate().subject.CN + ' ' +
                "------------- \n" +
                req.method + ' ' + req.url +
                "------------- \n");
        }


    });
    req.end();
    req.on('error', function(e) {
        console.error(e);
    });
}