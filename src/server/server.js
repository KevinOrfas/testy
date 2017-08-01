

const http = require('http');
const fs = require('fs');

const path = require('path');
const mime = require('mime');

const cache = {};
const PORT = 5000;
let server;

exports.start = (portNumber, dirToServe, callback) => {
  server = http.createServer((request, response) => {
    let filePath = false;

    if (request.url === '/') {
      filePath = `${dirToServe}/index.html`;
    } else {
      filePath = `${dirToServe}` + request.url;
    }

    const absPath = filePath;
    serveStatic(response, cache, absPath);
  }).listen(PORT, callback);
};

exports.stop = (callback) => {
  server.close(callback);
};


function send404(response) {
  response.writeHead(404, { 'Content-Type': 'text/plain' });
  response.write('Error 404: resource not found');
  response.end();
}

function sendFile(response, filePath, fileContents) {
  response.writeHead(200, { 'Content-Type': mime.lookup(path.basename(filePath)) });
  response.end(fileContents);
}

function serveStatic(response, cache, absPath) {
  if (cache[absPath]) {
    sendFile(response, absPath, cache[absPath]);
  } else {
    fs.exists(absPath, (exists) => {
      if (exists) {
        fs.readFile(absPath, (err, data) => {
          if (err) {
            send404(response);
          } else {
            cache[absPath] = data;
            sendFile(response, absPath, data);
          }
        });
      } else {
        send404(response);
      }
    });
  }
}
