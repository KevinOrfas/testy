const fs = require('fs');
const path = require('path');
const browserify = require('browserify');

exports.bundle = function (config, success, failure) {
  const b = browserify(config.options);

  b.add(path.resolve(config.entry));
  b.transform('babelify', { presets: ['es2015'] });
  b.bundle(function (err, bundle) {
    if (err) return failure(err);
    fs.writeFileSync(config.outfile, bundle);
    return success();
  });
};
