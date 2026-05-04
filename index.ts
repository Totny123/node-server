import * as http from 'http';
import * as fs from 'fs';
import * as path from 'path';
import { URL } from 'url';

const publicDir = path.resolve(__dirname, './public');
const server = http.createServer();

server.on('request', (request, response) => {
  const { method, headers } = request;
  const { pathname } = new URL(request.url || '', 'http://localhost');
  const fileName = pathname.slice(1) || 'index.html';

  fs.readFile(path.resolve(publicDir, fileName), (error, data) => {
    if (error) {
      console.log('feng error', error);
      if (error.errno === -2) {
        response.statusCode = 404;
        fs.readFile(path.resolve(publicDir, '404.html'), (e, d) => {
          if (e) throw e;
          response.end(d);
        });
      } else if (error.errno === -21) {
        response.statusCode = 403;
        response.end('无权限');
      } else {
        response.statusCode = 500;
        response.end('服务器繁忙');
      }
    } else {
      response.end(data);
    }
  });
});

server.listen(9999);
