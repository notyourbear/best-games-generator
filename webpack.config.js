module.exports = (env, args) => ({
  entry: './dev',
  mode: 'none',
  devtool: 'none',
  output: {
    library: 'bundle',
    libraryTarget: 'umd',
    filename: 'docs/bundle.js',
    globalObject: 'this',
  },
});
