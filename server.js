const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const expressWs = require('express-ws');

const app = express();
expressWs(app);

app.use(
  '/*',
  createProxyMiddleware({
    target: 'http://167.99.246.103:8080',
    changeOrigin: true,
  })
);

app.ws('/*', (ws, req) => {
  console.log('WebSocket connection established');

  const target = 'ws://167.99.246.103:8080';
  const wsProxy = new WebSocket(target);

  wsProxy.on('message', (data) => {
    ws.send(data);
  });

  ws.on('message', (data) => {
    wsProxy.send(data);
  });

  ws.on('close', () => {
    wsProxy.close();
  });

  wsProxy.on('error', (error) => {
    console.error('WebSocket proxy error:', error);
  });
});

app.listen(3001, () => {
  console.log('Сервер запущен на порту 3001');
});