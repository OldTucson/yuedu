module.exports = {
  devServer: {
    // 后面的url就是真正的api接口地址
    proxy: 'http://localhost:3000'
  }
}