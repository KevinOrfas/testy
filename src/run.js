const path = require('path');
const chalk = require('chalk');
const server = require('./server/server.js');

const port = process.argv[2];

server.start(port, path.resolve(__dirname, './client'), () => {
  console.log(chalk.green(`Starting app in dev mode... ${port}`));
});
