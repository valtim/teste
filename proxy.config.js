const proxy = [{
  context: '/api',
  target: 'http://teste.controledafadiga.com.br'
}];


const proxyLocal = [

  {
    "context": "/api",
    "target": {
      "host": "teste.controledafadiga.com.br",
      "protocol": "https:",
      "port": 443
    },
    "secure": false,
    "changeOrigin": true,
    "logLevel": "info"
  }

]

const proxyRede = [

  {
    "context": "/api",
    "target": {
      "host": "teste.controledafadiga.com.br",
      "protocol": "https:",
      "port": 443
    },
    "secure": false,
    "changeOrigin": true,
    "logLevel": "info"
  }

]

module.exports = proxyRede;
