const http = require('http');

exports.getPage = (url, callback) => {
  const request = http.get(url);
  request.on('response', (response) => {
    let error = null;
    let responseText = '';
    response.setEncoding('utf8');

    response.on('data', (chunk) => {
      responseText += chunk;
    });
    response.on('error', (err) => {
      error = err;
    });
    response.on('end', () => {
      callback(error, response, responseText);
    });
  });
};
