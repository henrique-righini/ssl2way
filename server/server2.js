const https = require('https');
// Embed valid fingerprints in the code
const FINGERPRINTSET = [
  '9D:5E:B6:46:44:CC:8D:9F:A2:B9:20:36:DE:2C:22:39:EA:EC:C5:0C'
];

var options = {
  hostname: 'localhost',
  port: 4433,
  path: '/',
  method: 'GET',
  headers: {
    'User-Agent': 'Node.js/https'
  }
};

var req = https.request(options, res => {
  res.on('data', d => {
    process.stdout.write(d);
  });
})
.on('error', e => {
  console.error(e);
});

req.on('socket', socket => {
  socket.on('secureConnect', () => {
    var fingerprint = socket.getPeerCertificate().fingerprint;

    // Check if certificate is valid
    if(socket.authorized === false){
      req.emit('error', new Error(socket.authorizationError));
      return req.abort();
    }

    // Match the fingerprint with our saved fingerprints
    if(FINGERPRINTSET.indexOf(fingerprint) === -1){
      // Abort request, optionally emit an error event
      req.emit('error', new Error('Fingerprint does not match'));
      return req.abort();
    }
  });
});

req.end();
