const fs = require('fs');
const expect = require('chai').expect;
const server = require('./server.js');
const httpUtil = require('../__http_util.js');
const paths = require('../../build/config/paths.js');

const TEST_FILE = paths.testDir + '/file.txt';
const TEST_DATA = 'Hello Test';

describe('Server', () => {

  beforeEach((done) => {
    fs.writeFile(TEST_FILE, TEST_DATA, (err) => {
      server.start(5000, paths.testDir, () => {
        done(err);
      });
    });
  });

  afterEach((done) => {
    server.stop(() => {
      fs.unlink(TEST_FILE, (err) => {
        done(err);
      });
    });
  });

  it('responds to requests', (done) => {
    httpUtil.getPage('http://localhost:5000/file.txt', (error, response, responseText) => {
      expect(response.statusCode).to.equal(200);
      expect(responseText).to.equal(TEST_DATA);
      done(error);
    });
  });

});
