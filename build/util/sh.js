const jake = require('jake');

exports.runMany = function (commands, successCallback, failureCallback) {
  const stdout = [];
  function serializedSh(command) {
    if (command) {
      run(command, (oneStdout) => {
        stdout.push(oneStdout);
        serializedSh(commands.shift());
      }, failureCallback);
    }
    else {
      successCallback(stdout);
    }
  }
  serializedSh(commands.shift());
};

const run = exports.run = (oneCommand, successCallback, failureCallback) => {
  let stdout = '';
  const child = jake.createExec(oneCommand);
  child.on('stdout', (data) => {
    process.stdout.write(data);
    stdout += data;
  });
  child.on('stderr', (data) => {
    process.stderr.write(data);
  });
  child.on('cmdEnd', () => {
    successCallback(stdout);
  });
  child.on('error', () => {
    failureCallback(stdout);
  });

  console.log('> ' + oneCommand);
  child.run();
};
