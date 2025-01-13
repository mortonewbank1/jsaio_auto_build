const config = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
    ],
  },
};

module.exports = () => {
  return config;
};
