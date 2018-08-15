const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const {VueLoaderPlugin} = require('vue-loader');
const postcssPresetEnv = require('postcss-preset-env');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const cssnano = require('cssnano');
const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  mode: devMode ? 'development' : 'production',
  entry: './src/main.js',
  output: {
    filename: 'vue-buddy.js',
    library: 'VueBuddy',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'stage-3']
          }
        },
        include: [path.resolve(__dirname, 'src')]
      },
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [
                postcssPresetEnv({
                  features: {
                    'nesting-rules': true
                  }
                }),
                cssnano()
              ]
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin('dist'),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: 'vue-buddy.css'
    })
  ]
};