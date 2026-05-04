import * as http from 'http';
import * as fs from 'fs';
import * as path from 'path';
import { URL } from 'url';

const publicDir = path.resolve(__dirname, './public');
const server = http.createServer();

server.on('request', (request, response) => {
  const { method, headers } = request;
  const { pathname } = new URL(request.url || '', 'http://localhost');

  switch (pathname) {
    case '/index.html':
      fs.readFile(path.resolve(publicDir, './index.html'), (error, data) => {
        if (error) throw error;
        response.setHeader('Content-Type', 'text/html; charset=utf-8');
        response.end(data.toString());
      });
      break;
    case '/style.css':
      fs.readFile(path.resolve(publicDir, './style.css'), (error, data) => {
        if (error) throw error;
        response.setHeader('Content-Type', 'text/css; charset=utf-8');
        response.end(data.toString());
      });
      break;
    case '/main.js':
      fs.readFile(path.resolve(publicDir, './main.js'), (error, data) => {
        if (error) throw error;
        response.setHeader('Content-Type', 'text/javascript; charset=utf-8');
        response.end(data.toString());
      });
      break;
    default:
      response.statusCode = 404;
      response.end();
  }
});

server.listen(9999);
