const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const TsconfigPathsWebpackPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  entry: {
    app: './src/index.tsx',
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: './public/favicon.ico',
      inject: 'body',
    }),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json', '.scss', '.css', '.svg'],
    plugins: [
      new TsconfigPathsWebpackPlugin({
        configFile: path.resolve(process.cwd(), './tsconfig.json'),
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /(\.s?css)$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.svg$/,
        use: 'react-svg-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg)/,
        use: 'file-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
      },
    ],
  },
};
