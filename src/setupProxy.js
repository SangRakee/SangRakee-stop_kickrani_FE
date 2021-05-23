const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/kickrani/',
        createProxyMiddleware({
            target: 'http://localhost:8000/',
            changeOrigin: true,
        })
    );
};