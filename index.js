var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');

function ExportFilesPlugin(paths, options) {
  this.options = options || {};
  if (!this.options.outputPath) {
    this.options.outputPath = path.dirname(module.parent.filename);
  }

  if (typeof paths === 'string' || paths instanceof String) {
    paths = [paths];
  }

  this.paths = paths || [];
}

ExportFilesPlugin.prototype.apply = function(compiler) {
  var paths = this.paths;
  var outputPath = this.options.outputPath;

  compiler.plugin('emit', function(compilation, compileCallback) {
    var assets = [];
    var file, asset, length;
    var savedCount = 0;
    var hasErr = false;

    for (file in compilation.assets) {
      if (paths.indexOf(file) !== -1) {
        assets.push({ file: file, asset: compilation.assets[file] });
      }
    }

    length = assets.length;
    if (!length) {
      return compileCallback();
    }

    for (var i = 0; i < length; i++) {
      asset = assets[i].asset;
      file = assets[i].file;
      var filePath = path.join(outputPath, file);

      mkdirp(path.dirname(filePath), function(mkdirErr) {
        if (hasErr) { return null; }
        if (mkdirErr) {
          hasErr = true;
          return compileCallback(mkdirErr);
        }

        fs.writeFile(filePath, asset.source(), function(writeErr) {
          if (hasErr) { return null; }
          if (writeErr) {
            hasErr = true;
            return compileCallback(writeErr);
          }

          savedCount++;
          if (savedCount === length) {
            return compileCallback();
          }
        });
      });
    }
  });
};

module.exports = ExportFilesPlugin;
