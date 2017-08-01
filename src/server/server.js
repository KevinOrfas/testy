const httpServer = require('http-server');
let server;

exports.start = (portNumber, dirToServe, callback) => {
  server = httpServer.createServer({
    root: dirToServe
  });
  server.listen(portNumber, callback);
};

exports.stop = (callback) => {
  // Technically, we're poking into HttpServer's private data here. Bad us. The http-server module is just a
  // placeholder, and it doesn't have a callback for server.close(). Bad http-server. So don't use this code.
  // Write something better.
  server.server.close(callback);
};
