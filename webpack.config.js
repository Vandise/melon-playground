var fs = require('fs');
var path = require('path');
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var WebpackPreBuildPlugin = require('pre-build-webpack');

var staticResourceDir = '/data/';
var ignoreFiles = ['.DS_Store'];
var resourcesPath = './src/static/data/';
var resourcesFile = './src/client/resources.json';

var melontypes = {
  image: ['png', 'jpg', 'jpeg'],
  binary: ['fnt', 'ltr', 'ttf'],
  tmx: ['tmx'],
  audio: ['mp3', 'ogg']
};

module.exports = {
  entry: [
    "webpack-dev-server/client?http://0.0.0.0:9090",
    'webpack/hot/only-dev-server',
    './lib/melonJS.js',
    './lib/plugins/debugPanel.js',
    './src/index.js'
  ],
  output: {
    path: path.join(__dirname, "public"),
    filename: 'bundle.js'
  },
  resolveLoader: {
    modulesDirectories: ['node_modules']
  },
  plugins: [
    new WebpackPreBuildPlugin(function(stats) {
      var walkSync = function(dir, filelist) {
        var fs = fs || require('fs'),
        files = fs.readdirSync(dir);
        filelist = filelist || [];
        files.forEach(function(file) {
          if (fs.statSync(dir + '/' + file).isDirectory()) {
            filelist = walkSync(dir + file + '/', filelist);
          } else {
            if (ignoreFiles.indexOf(file) < 0) {
              var src = dir.replace(resourcesPath, '') + file;
              var file = {};
              var fragments = src.split('.');
              file['name'] = fragments[0];
              file['src'] = staticResourceDir + src;
              Object.keys(melontypes).some(function(type) {
                if (melontypes[type].indexOf(fragments[1]) >= 0) {
                  file['type'] = type;
                  return true;
                }
                return false;
              });
              filelist.push(file);
            }
          }
        });
        return filelist;
      };
      var data = walkSync(resourcesPath);
      var file = fs.createWriteStream(resourcesFile);
      console.log("Exporting resources to: " + resourcesFile);
      file.write(JSON.stringify(data, null, '  '));
      file.end();
    }),
    new CopyWebpackPlugin([
      { from: './src/static/', to: path.join(__dirname, "public")},
    ]),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.IgnorePlugin(/vertx/)
  ],
  debug: true,
  devtool: 'source-map',
  resolve: {
    extensions: ['', '.js']
  },
  module: {
    loaders: [
      { test: /\.jsx?$/,    loader: 'babel', include: path.join(__dirname, 'src'), exclude: '/node_modules/' },
      { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' }
    ]
  },
  node: {
    fs: "empty"
  }
};