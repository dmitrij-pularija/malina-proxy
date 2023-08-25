const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

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