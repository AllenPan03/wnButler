//var ExtractTextPlugin = require("extract-text-webpack-plugin");
// 使用webpack打包
var Webpack = require("webpack");//必须引入
//var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
  entry: {
	"main": "./src/js/main.js",
    // "common": "./static/js/common.js"
    // "amazeui": "./static/css/wap/amazeui.min.css"
      // "zxl-amazeui": "./static/js/wap/wn_amazeui.min.js"
  },
  output:{
	path:"./build/js",
    filename: "main.bundle.js"
  },
  module: {
    loaders: [
       {test: /.css$/, loader: 'style!css'},
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
        //new ExtractTextPlugin("./common.css")
        //new webpack.optimize.UglifyJsPlugin({
        //    sourceMap: true
      //  })
    ]
    //devtool: "#source-map"
};