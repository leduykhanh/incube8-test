var webpack = require('webpack');
var path = require('path');
var fs = require('fs')
var BUILD_DIR = path.resolve(__dirname, 'static');
var APP_DIR = path.resolve(__dirname, 'client');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

const babelSettings = JSON.parse(fs.readFileSync(".babelrc"));
babelSettings.plugins.push("transform-react-inline-elements");
babelSettings.plugins.push("transform-react-constant-elements");
commonSassPaths = [path.resolve(__dirname, './sass/common') ]
module.exports = {
  entry: [
    './client/index.js'
  ],
  output: {
    path: __dirname,
    publicPath: '/static/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['react', 'es2015', 'stage-1']
      }
    }],
    rules : [
      {
        loaders : ['babel-loader'],
        test : /\.jsx?/,
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract(
        {
            loader: ["css-loader","sass-loader"]
        })
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: ['node_modules',
           'sass',
         path.resolve(__dirname,'node_modules'),
         path.resolve(__dirname,'client'),
         path.resolve(__dirname,'sass'),
         path.resolve(__dirname,'client/bus'),
         path.resolve(__dirname,'client/containers'),
         path.resolve(__dirname,'client/reducers')]
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './static/',
    hot: true,
  },
  plugins:[
    new ExtractTextPlugin({
            filename: 'css/bundle.css',
        })
  ]
};
