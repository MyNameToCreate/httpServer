const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
    let filePath = '.' + req.url;
    if (filePath === './') {
        filePath = './index.html';
    }

    const resolvePath = path.resolve(filePath);

    fs.readFile(resolvePath, (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                res.writeHead(404);
                res.end("404 not found");
            } else {
                res.writeHead(500);
                res.end("internal server error");
            }
        } else {
            let contentType = 'text/html';
            const extname = path.extname(resolvePath);
            switch (extname) {
                case '.js':
                    contentType = 'text/javascript';
                    break;
                    case '.css':
                    contentType = 'text/css';
                    break;
                case '.json':
                    contentType = 'application/json';
                    break;
                case '.png':
                    contentType = 'image/png';
                    break;
                case '.jpg':
                    contentType = 'image/jpg';
                    break;
            }
            res.writeHead(200, {'content-type': contentType});
            res.end(data);
        }
    })
})

const port = process.env.PORT || 3000;

server.listen(port, () => {
    console.log(`http server running on ${port}`)
});