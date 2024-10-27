const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  console.log(req.url, req.method);

  // set header content-type
  res.setHeader('Content-Type', 'text/html');

  // send an html file
  fs.readFile('./views/index.html', (err, data) => {
    if (err) {
      console.error(err);
      res.end();
    }
    else {
      res.end(data);
    }
  })
});

server.listen(3000, 'localhost', () => {
  console.log('Server is listening on port 3000');
});