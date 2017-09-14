/* eslint-disable no-unused-vars */

const startTime = Date.now();

const shell = require('shelljs');
const version = require('../util/version_checker.js');
const paths = require('../config/paths.js');
const mocha = require('../util/mocha_runner.js');
const karma = require('../util/karma_runner.js');
const browserify = require('../util/browserify_runner.js');
const browsers = require('../config/tested_browsers.js');
const opn = require('opn');
const KARMA_CONFIG = './build/config/karma.conf.js';
const MOCHA_CONFIG = {
  ui: 'bdd',
  reporter: 'dot'
};

const serverFiles = 'src/*.js build/**/*.js';
const clientFiles = 'src/client';
const eslint = 'node_modules/.bin/eslint';
const port = '9876';
const strict = !process.env.loose;

//*** GENERAL

desc('Lint and test');
task('default', ['version', 'lint', 'test'], () => {
  const elapsedSeconds = (Date.now() - startTime) / 1000;
  console.log(`\n\nBUILD OK  (${elapsedSeconds.toFixed(2)} s)`);
});

desc('Start server (for manual testing)');
task('run', ['build'], () => {
  console.log('Starting server. Press Ctrl-C to exit.');
  jake.exec('node ' + paths.distDir + '/run.js 5020', { interactive: true }, complete);
}, { async: true });

desc('Delete generated files');
task('clean', () => {
  shell.rm('-rf', paths.generatedDir);
});

//*** LINT

desc('Lint everything');
task('lint', ['lintNode', 'lintClient']);

task('lintNode', () => {
  process.stdout.write('Linting Node.js code: \n');
  jake.exec(`${eslint} ${serverFiles}`, { interactive: true }, complete);
}, { async: true });

task('lintClient', () => {
  process.stdout.write('Linting browser code: ');
  jake.exec(`${eslint} ${clientFiles}`, { interactive: true }, complete);
}, { async: true });

//*** TEST
desc('Start Karma server -- run this first');
task('karma', () => {
  karma.serve(KARMA_CONFIG, complete, fail);

  opn(`http://localhost:${port}`);
}, { async: true });




desc('Run tests');
task('test', ['testServer', 'testClient']);

task('testServer', [paths.testDir], () => {
  process.stdout.write('Testing Node.js code: ');
  mocha.runTests({
    files: ['src/server/**/_*_test.js'],
    options: MOCHA_CONFIG
  }, complete, fail);
}, { async: true });

task('testClient', function () {
  console.log('Testing browser code: ');
  karma.runTests({
    configFile: KARMA_CONFIG,
    browsers: browsers,
    strict: strict
  }, complete, fail);
}, { async: true });



//*** BUILD
desc('Build distribution package');
task('build', ['prepDistDir', 'buildClient', 'buildServer']);

task('prepDistDir', () => {
  shell.rm('-rf', paths.distDir);
});

task('buildClient', [paths.clientDistDir, 'bundleClientJs'], () => {
  console.log('Copying client code: .');
  shell.cp(paths.clientDir + '/*.html', paths.clientDir + '/*.css', paths.clientDistDir);
});

task('bundleClientJs', [paths.clientDistDir], () => {
  console.log('Bundling browser code with Browserify: .');
  browserify.bundle({
    entry: paths.clientEntryPoint,
    outfile: paths.clientDistBundle,
    options: {
      standalone: 'example',
      debug: true
    }
  }, complete, fail);
}, { async: true });

task('buildServer', () => {
  console.log('Copying server code: .');
  shell.cp('-R', paths.serverDir, paths.serverEntryPoint, paths.distDir);
});

//*** CHECK VERSIONS

desc('Check Node version');
task('version', () => {
  console.log('Checking Node.js version: .');
  version.check({
    name: 'Node',
    expected: require('../../package.json').engines.node,
    actual: process.version,
    strict: strict
  }, complete, fail);
}, { async: true });

//*** CREATE DIRECTORIES

directory(paths.testDir);
directory(paths.clientDistDir);
