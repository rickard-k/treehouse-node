const http = require('http');
const router = require('./router');

const server = http.createServer((req, res) => {
    router.home(req, res);
    router.user(req, res);
});

server.listen(3000, () => 
    console.log('Listening on port 3000.')
);