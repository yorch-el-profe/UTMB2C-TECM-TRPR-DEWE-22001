const {createServer} = require('node:http');
const html = `
  <html>
    <body>
      <h1>HTML desde Node.js</h1>
    </body>
  </html>
`;

const server = createServer(function (request, response) {
  response.setHeader('Content-Type', 'text/html');
  response.write(html);
  response.end();
});

server.listen(8080);