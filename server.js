const express = require('express');
const httpProxy = require('http-proxy');

const targetURL = 'http://167.99.246.103';

const app = express();
const proxy = httpProxy.createProxyServer();

app.all('*', (req, res) => {
  proxy.web(req, res, { target: targetURL });
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
