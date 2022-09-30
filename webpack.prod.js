const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");


module.exports = {
  mode: "production",
  output: {
    clean: true,
    filename: 'main.[fullhash].js'
  },
  module: {
    rules: [
      {
        test: /\.html$/i, //expresion regular
        loader: "html-loader",
        options: {
          sources: false, //si movemos algún archivo, se actualice la ubicación.
        },
      },
      {
        test: /\.css$/i,
        exclude: /styles.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /styles.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: 'file-loader' 
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }    
    ]
  },

  optimization: {
      minimize:true,
      minimizer: [
          new CssMinimizerPlugin(),
          new TerserPlugin(),
      ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: "Mi Webpack App",
      // filename: 'holamundo.html' para cambiarle de nombre al archivo index.html.
      template: "./src/index.html",
    }),

    new MiniCssExtractPlugin({
        filename: '[name].[fullhash].css', //sirve para que los navagadores no alamacenen en el cache
        ignoreOrder: false
    }),

    new CopyPlugin({
      patterns: [
        { from: "src/assets/", to: "assets/" } //para copiar archivos estático en producción.
      ],
    })

  ]
};
