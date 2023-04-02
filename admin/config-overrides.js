const { override, fixBabelImports, disableEsLint } = require('customize-cra')
const CompressionWebpackPlugin = require('compression-webpack-plugin')

const addCustomize = () => (config) => {
  if (process.env.NODE_ENV === 'production') {
    // 关闭sourceMap
    config.devtool = false
    // 配置打包后的文件位置
    // 添加js打包gzip配置
    config.plugins.push(
      new CompressionWebpackPlugin({
        test: /\.(css|js)$/,
        // 只处理比1kb大的资源
        threshold: 1024,
        // 只处理压缩率低于90%的文件
        minRatio: 0.9,
      })
    )
  }
  return config
}

module.exports = override(
  disableEsLint(),
  // antd按需加载
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addCustomize()
)
