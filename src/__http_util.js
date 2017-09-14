const http = require('http');

exports.getPage = function (url, callback) {
  const request = http.get(url);
  request.on('response', function (response) {
    let error = null;
    let responseText = '';
    response.setEncoding('utf8');

    response.on('data', function (chunk) {
      responseText += chunk;
    });
    response.on('error', function (err) {
      error = err;
    });
    response.on('end', function () {
      callback(error, response, responseText);
    });
  });
};
