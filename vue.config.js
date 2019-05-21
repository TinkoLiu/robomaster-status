module.exports = {
  productionSourceMap: false,
  assetsDir: 'static/',
  devServer: {
    proxy: 'https://robomasters.dog/'
  },
  transpileDependencies: [
    'vue-echarts',
    'resize-detector'
  ]
}
