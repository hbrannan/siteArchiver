module.exports ={
  output: {
    libraryTarget: 'commonjs2'
  },
  module: {
    loaders: [
      {
        test: /\.less$/,
        loaders: [
          'style-loader',
          'css-loader?localIdentName=[hash:base64:5]&modules&importLoaders=1!less-loader'
        ]
      }
    ]
  }
}
