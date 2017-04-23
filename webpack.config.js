var path = require('path');
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
        exclude: /node_modules/,
        loaders : ['babel-loader'],
        test: /\.scss$/,
        use: ["style-loader", "css-loader?sourceMap",
            {
                loader:"sass-loader",
                options:
                {
                    sourceMap: true,
                    includePaths :commonSassPaths
                }
            }]

      }

    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
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
  }
};
