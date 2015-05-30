# export-files-webpack-plugin
Exports files to FS (even in devserver mode)

## Install

```
npm install --save-dev export-files-webpack-plugin
```

## Why would I need it?

[**Webpack-dev-server**](https://github.com/webpack/webpack-dev-server) allows you to set up locally live reloading server. But if you don't use node.js server on production, you might want to use webpack-dev-server only as a live reloading js bundle provider, as described [here](http://webpack.github.io/docs/webpack-dev-server.html#combining-with-an-existing-server).

However, in that case you'll have to update files, other than js bundle, by yourself. You might use some file-generating plugins on production (e.g. [HTML Webpack Plugin](https://github.com/ampedandwired/html-webpack-plugin)), but it would be useless on development, as dev-server is not actually saving any files on the disk.

So, to enforce saving file on disk and make them "live" (as webpack can detect their changes and rerun plugin), you can use this plugin:

```
var ExportFilesWebpackPlugin = require('export-files-webpack-plugin');

config = {
  ...
  
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      filename: 'server/templates/index.html',
      template: 'client/views/index.tpl'
    }),
    new ExportFilesWebpackPlugin('server/templates/index.html')
  ]
  
  ...
}
```
