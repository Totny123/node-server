import * as http from 'http';

const server = http.createServer();

server.on('request', (request, response) => {
  console.log('feng 有人请求了');

  response.end('hi 来自服务器');
});

server.listen(9999);
