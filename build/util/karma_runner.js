const path = require('path');
const chalk = require('chalk');
const sh = require('./sh.js');
const runner = require('karma').runner;
const server = require('karma').Server;

const KARMA = 'node node_modules/karma/bin/karma';

exports.serve = (configFile, success, fail) => {
  const command = `${KARMA} start ${configFile}`;
  sh.run(command, success, function () {
    fail('Could not start Karma server');
  });
};

exports.runTests = (options, success, fail) => {
  options.capture = options.capture || [];
  const config = {
    configFile: path.resolve(options.configFile),
    browsers: options.capture,
    singleRun: options.capture.length > 0
  };

  let runKarma = runner.run.bind(runner);
  if (config.singleRun) runKarma = server.start.bind(server);

  const stdout = new CapturedStdout();
  runKarma(config, (exitCode) => {
    stdout.restore();

    if (exitCode) return fail(chalk.red('Client tests failed (did you start the Karma server?)'));
    const browserMissing = checkRequiredBrowsers(options.browsers, stdout);
    if (browserMissing && options.strict) return fail(chalk.red('Did not test all browsers'));
    if (stdout.capturedOutput.indexOf('TOTAL: 0 SUCCESS') !== -1) return fail(chalk.red('No tests were run!'));
    console.log(chalk.cyan(`Karma has exited with ${exitCode}`));

    return success();
  });

};

function checkRequiredBrowsers(requiredBrowsers, stdout) {
  let browserMissing = false;
  requiredBrowsers.forEach((browser) => {
    browserMissing = lookForBrowser(browser, stdout.capturedOutput) || browserMissing;
  });
  return browserMissing;
}

function lookForBrowser(browser, output) {
  const missing = output.indexOf(`${browser}: Executed`) === -1;
  if (missing) console.log(`Warning: ${browser} was not tested!`);
  return missing;
}

function CapturedStdout() {
  const self = this;
  self.oldStdout = process.stdout.write;
  self.capturedOutput = '';

  process.stdout.write = function (data) {
    self.capturedOutput += data;
    self.oldStdout.apply(this, arguments);
  };
}

CapturedStdout.prototype.restore = function () {
  process.stdout.write = this.oldStdout;
};
