module.exports = {
  lintOnSave: false,
  productionSourceMap:false,
  // baseUrl: './',
  publicPath:'./',//history模式下的配置
  outputDir: 'outbreak-manage',
  assetsDir: 'static',
  indexPath: 'index.html',
  pages: {
    index: {
      entry: 'src/main.js',
    }
  },
}
