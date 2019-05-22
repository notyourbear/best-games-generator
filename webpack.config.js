module.exports = (env, args) => ({
  entry: "./dev",
  mode: "none",
  devtool: "none",
  output: {
    library: "bundle",
    libraryTarget: "umd",
    filename: "bundle.js",
    globalObject: "this"
  }
});
