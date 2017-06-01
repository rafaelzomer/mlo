const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: "./src/index.js",
  cache: true,
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[hash].[name].js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|jpeg|svg)$/,
        use: [
          {
            loader: 'file-loader',
          },
          {
            loader: 'image-webpack-loader',
          },
        ],
      },
      {
        test: /\.mp3$/,
        use: ['file-loader'],
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new CleanWebpackPlugin(['dist'])
  ]
}