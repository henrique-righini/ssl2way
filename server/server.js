var fs = require('fs');
var https = require('https');

const FINGERPRINTSET = ['9D:5E:B6:46:44:CC:8D:9F:A2:B9:20:36:DE:2C:22:39:EA:EC:C5:0C'];

var options = {
    key: fs.readFileSync('server-key.pem'),
    cert: fs.readFileSync('server-crt.pem'),
    ca: fs.readFileSync('ca-crt.pem'),
    requestCert: true,
    rejectUnauthorized: false
};
https.createServer(options, function(req, res) {

    var fingerprint = req.socket.getPeerCertificate().fingerprint;
    //console.log(fingerprint)

    if (FINGERPRINTSET.indexOf(fingerprint) != -1) {
        console.log("Cliente Correto")
        console.log(new Date() + ' ' +
            req.connection.remoteAddress + ' ' +
            req.socket.getPeerCertificate().subject.CN + ' ' +
            req.method + ' ' + req.url);
        res.writeHead(200);
        res.end("hello world\n");
    } else {

        console.log("Cliente Correto")
        console.log(new Date() + ' ' +
            req.connection.remoteAddress + ' ' +
            req.socket.getPeerCertificate().subject.CN + ' ' +
            req.method + ' ' + req.url);
        res.writeHead(200);
        res.end("Finger Não confere\n");

    }

}).listen(4433, '0.0.0.0');