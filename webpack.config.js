const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const postcssPresetEnv = require('postcss-preset-env');
const cssnano = require('cssnano');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {VueLoaderPlugin} = require('vue-loader');
const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  mode: devMode ? 'development' : 'production',
  entry: './src/main.js',
  output: {
    filename: 'vue-buddy.js',
    library: 'VueBuddy',
    libraryTarget: 'umd'
  },
  externals: {
    vue: {
      root: 'Vue',
      commonjs: 'vue',
      commonjs2: 'vue',
      amd: 'vue'
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        },
        include: path.resolve(__dirname, 'src')
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
                    'nesting-rules': true,
                    'custom-properties': {
                      preserve: false
                    }
                  }
                }),
                cssnano()
              ]
            }
          }
        ]
      },
      {
        test: /\.vue$/,
        use: 'vue-loader'
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