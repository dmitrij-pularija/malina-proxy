const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use(
  /\/.*\/ws\//,
  createProxyMiddleware({
    target: 'ws://167.99.246.103:8080',
    changeOrigin: true,
    ws: true,
    pathRewrite: (path) => path.replace(/\/ws\//, '/'),
  })
);

app.use(
  '/*',
  createProxyMiddleware({
    target: 'http://167.99.246.103:8080',
    changeOrigin: true,
  })
);

app.listen(3001, () => {
  console.log('Сервер запущен на порту 3001');
});