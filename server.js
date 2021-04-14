const http = require('http');

const app = require('./src/app');

const server = http.createServer(app);

server.listen(app.get('port'), () => {
  console.log(`Server listening on port ${app.get('port')}`)
});
