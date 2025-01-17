var path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: false,
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    bundleAnalyzerReport: process.env.npm_config_report
  },
  // dev: {
  //   env: require('./dev.env'),
  //   port: 80,
  //   host: 'http://localhost/idea/home',
  //   autoOpenBrowser: true,
  //   assetsSubDirectory: 'static',
  //   assetsPublicPath: '/',
	// 	proxyTable: {
	// 		'/api': {
	// 		  target: 'http://laborindex-sit.woda.ink/',
	// 		  changeOrigin: true,
	// 		},
	// 	},
  //   cssSourceMap: false
  // }
  dev: {
    env: require('./dev.env'),
    port: 80,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/api':{
        target:'https://cnodejs.org/api/v1',
        changeOrigin:true,
        pathRewrite:{
          '^/api':'/'
        }
      }
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
