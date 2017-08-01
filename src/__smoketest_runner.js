const httpUtil = require('./__http_util.js');

const HOME_PAGE_MARKER = 'automatopia home page';

exports.runTests = function (url, callback) {
  checkMarker(url, HOME_PAGE_MARKER, function (foundMarker) {
    if (!foundMarker) console.log('Did not find home page marker');
    callback(foundMarker);
  });
};

function checkMarker(url, marker, callback) {
  httpUtil.getPage(url, function (error, response, responseText) {
    const foundMarker = responseText.indexOf(marker) !== -1;
    callback(foundMarker);
  });
}
