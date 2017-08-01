const UNIX_BUILD_COMMAND = './jake.sh';
const WINDOWS_BUILD_COMMAND = 'jake.bat';

const os = require('os');

exports.get = function () {
  return os.platform() === 'win32' ? WINDOWS_BUILD_COMMAND : UNIX_BUILD_COMMAND;
};
