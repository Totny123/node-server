import * as http from 'http';
import * as fs from 'fs';
import * as path from 'path';

const publicDir = path.resolve(__dirname, './public');
const server = http.createServer();

server.on('request', (request, response) => {
  const { method, url, headers } = request;
  switch (url) {
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
  }
});

server.listen(9999);
