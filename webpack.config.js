const HtmlWebPackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const path = require('path');
const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

let config = {
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx', '.css', '.json', '.less'],
    modules: [path.join(__dirname, 'src'), 'node_modules'],
    alias: {
      react: path.join(__dirname, 'node_modules', 'react'),
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/i,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            },
          },
          {
            loader: 'eslint-loader',
            options: {
              cache: true,
              configFile: '.eslintrc.json',
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              url: true,
              import: true,
              sourceMap: true,
              importLoaders: 1,
              modules: {
                mode: (resourcePath) => {
                  if (/.global.css$/i.test(resourcePath)) {
                    return 'global';
                  }
                  if (/node_modules/i.test(resourcePath)) {
                    return 'global';
                  }

                  return 'local';
                },
                exportGlobals: true,
                localIdentName: '[sha512:hash:base64:5]',
              },
            },
          },
        ],
      },

      {
        test: /\.less$/i,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true, //TODO: Documentation states this option as deprecated, use @plugin
              },
            },
          },
        ],
      },

      // Matching rules for images
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        exclude: /node_modules/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[sha512:hash:base64:5].[ext][query]',
              outputPath: 'images',
            },
          },
        ],
      },

      // Matching rules for fonts
      {
        test: /\.(woff|woff2|eot|ttf)$/i,
        exclude: /node_modules/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[sha512:hash:base64:5].[ext][query]',
              outputPath: 'fonts',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      async: false,
      typescript: {
        configFile: 'tsconfig.json',
      },
    }),
    new HtmlWebPackPlugin({
      template: './index.html',
      favicon: './favicon.png',
    }),
  ],
};

module.exports = (env, argv) => {
  config.mode = argv.mode;
  if (argv.mode === 'development') {
    config.entry = ['react-hot-loader/patch', './src'];
    config.devtool = 'inline-source-map';
    config.resolve.alias['react-dom'] = '@hot-loader/react-dom';
    config.plugins.push(new webpack.HotModuleReplacementPlugin());
    config.devServer = {
      compress: true,
      hot: true,
      contentBase: './build',
      historyApiFallback: true, //For react router
    };
  }

  if (argv.mode === 'production') {
    config.entry = ['./src'];
    config.devtool = 'source-map';
    config.output.filename = '[name].[chunkhash].bundle.js';
    config.output.chunkFilename = '[name].[chunkhash].bundle.js';
    config.optimization = {
      moduleIds: 'hashed',
      runtimeChunk: {
        name: 'manifest',
      },
      // splitChunks: {
      //   cacheGroups: {
      //     vendors: {
      //     },
      //     // This can be your own design library.

      //   },
      // },
    };
    config.plugins.push(
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
      }),
      new CompressionPlugin({
        test: /\.js(\?.*)?$/i,
      }),
      new CopyPlugin({
        patterns: [{ from: './_redirects' }],
      }),
    );
    config.performance = {
      hints: 'warning',
      // Calculates sizes of gziped bundles.
      assetFilter: function (assetFilename) {
        return assetFilename.endsWith('.js.gz');
      },
    };
  }

  console.log('Webpack config\n');

  return config;
};
