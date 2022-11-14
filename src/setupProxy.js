const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {

  app.use('/api', createProxyMiddleware({
    target: 'http://localhost:8080',
    changeOrigin: true,
    pathRewrite: {
      '^/api': ''
    },
  }))

  app.use('/v1', createProxyMiddleware({
    target: 'https://zhongyan.cases.highsoft.ltd/',
    changeOrigin: true,
    pathRewrite: {
      '^/v1': ''
    },
  }))

  app.use('/v2', createProxyMiddleware({
    target: 'https://v1.hitokoto.cn/',
    changeOrigin: true,
    pathRewrite: {
      '^/v2': ''
    },
  }))
}
