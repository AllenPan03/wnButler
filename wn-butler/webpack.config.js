//var ExtractTextPlugin = require("extract-text-webpack-plugin");
// 使用webpack打包
//var webpack = require('webpack');
//var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
  entry: {
      //teat1:'webpack-dev-server/client?http://127.0.0.1:8081', // WebpackDevServer host and port
     // teat2:'webpack/hot/only-dev-server',
	  "main": "./src/js/components/evaluate/tmpl/index.js",
    // "common": "./static/js/common.js"
    // "amazeui": "./static/css/wap/amazeui.min.css"
      // "zxl-amazeui": "./static/js/wap/wn_amazeui.min.js"
  },
  output:{
	path:"./build/js",
    filename: "bundle.js"
  },
  module: {
    loaders: [
       {test: /.css$/, loader: 'style!css'},
       { test: /\.jsx?$/, loaders: ['react-hot','jsx?harmony'], exclude: /node_modules/ },
       //{test: /.(png|jpg)$/, loader: 'url?limit=8192&name=images/[hash].[ext]'}
        //{test:/\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader")}
        {test: /\.scss$/, loader: "style!css!scss"}
       //{ test: /\.css$/, loader: 'style-loader!css-loader' },
        /*{
            test:  /\.(jpe?g|png|gif|svg)$/i,
            loader:[
                'image?...',
                'url?limit=8192&name=build/[hash].[ext]'
            ]
        }*/
    ]
  },
  resolve:{
      extensions: ['', '.js', '.jsx']
  },
    plugins: [
        //new webpack.HotModuleReplacementPlugin(),
        //new webpack.NoErrorsPlugin()
        //new ExtractTextPlugin("./common.css")
        //new webpack.optimize.UglifyJsPlugin({
        //    sourceMap: true
      //  })
    ]
    //devtool: "#source-map"
};