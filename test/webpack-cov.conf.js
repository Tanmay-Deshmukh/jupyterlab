var path = require('path');

module.exports = {
  entry: './test/src/index.ts',
  output: {
    path: __dirname + "/build",
    filename: "coverage.js",
    devtoolModuleFilenameTemplate: '[resource-path]'
  },
  bail: true,
  devtool: 'source-map',
  module: {
    noParse: [/xterm\.js/],  // Xterm ships a UMD module
    loaders: [
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.md$/, loader: 'raw-loader'},
      { test: /\.html$/, loader: 'file-loader?name=[name].[ext]' },
      { test: /\.ipynb$/, loader: 'json-loader' },
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.tsx?$/, loader: 'ts-loader' }
    ],
    preLoaders: [
      // instrument only testing sources with Istanbul
      {
        test: /\.js$/,
        include: path.resolve('lib/'),
        loader: 'istanbul-instrumenter'
      }
    ]
  },
  resolve: {
    // Add '.ts' as resolvable extensions.
    extensions: ['', '.webpack.js', '.web.js', '.js', '.ts']
  }
}
