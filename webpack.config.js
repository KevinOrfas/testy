import path from 'path';

export default {
  devtool: 'inline-source-map',
  output: {
    filename: 'bundle.js'
  },
  entry: [
    path.resolve(__dirname, 'src/index')
  ],
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: ['.ts', '.tsx', '.js'] // note if using webpack 1 you'd also need a '' in the array as well
  },
  module: {
    rules: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      { test: /\.js$/, exclude: /node_modules/, use: 'babel-loader' },
      { test: /\.tsx?$/, loader: 'ts-loader' }
    ]
  }
}
