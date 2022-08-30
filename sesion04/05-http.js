const {createServer} = require('node:http');

const server = createServer(function (request, response) {
  console.log('Ejecutando API');
  // Respondiendo la petición con un texto
  response.write('Consultaste un API en Node.js');
  response.end(); // Responde la petición
});

server.listen(8080);