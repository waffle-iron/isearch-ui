module.exports = function (config) {
  config.set({

    singleRun: true,

    browsers: ['Chrome'],

    frameworks: ['mocha', 'sinon'],

    files: [
      '../lib/**/*.test.js',
      '../test/**/*.test.js'
    ],

    phantomjsLauncher: {
      // Have phantomjs exit if a ResourceError is encountered (useful if karma exits without killing phantom)
      exitOnResourceError: true
    },

    client: {
      mocha: {
        // change Karma's debug.html to the mocha web reporter
        reporter: 'spec'
      }
    },

    preprocessors: {
      '../test/**/*.js': ['webpack'],
      '../lib/**/*.js': ['webpack']
    },

    webpackMiddleware: {
      noInfo: true
    },

    webpack: {
      module: {
        loaders: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel'
          },
          {
            test: /\.json$/,
            loader: 'json-loader'
          },
          {
            test: /\.css$/,
            loader: 'style-loader!css-loader'
          },
          {
            test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
            loader: 'file-loader?name=fonts/[name].[ext]'
          },
          {
            test: /\.png$/,
            loader: 'url-loader',
            query: { mimetype: 'image/png' }
          }
        ]
      }
    }

  });
};
