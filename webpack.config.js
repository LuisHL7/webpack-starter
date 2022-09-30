const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "development",
  output: {
    clean: true,
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
      }    
    ]
  },

  optimization: {},

  plugins: [
    new HtmlWebpackPlugin({
      title: "Mi Webpack App",
      // filename: 'holamundo.html' para cambiarle de nombre al archivo index.html.
      template: "./src/index.html",
    }),

    new MiniCssExtractPlugin({
        filename: '[name].css',  // filename: '[name].[fullhash].css', //srive para que los navagadores no alamacenen en el cache
        ignoreOrder: false
    }),

    new CopyPlugin({
      patterns: [
        { from: "src/assets/", to: "assets/" } //para copiar archivos estático en producción.
      ],
    })

  ]
};
