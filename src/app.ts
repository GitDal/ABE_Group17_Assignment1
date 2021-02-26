import connect from "./models/db";
import express from "express";
import http from "http";
import indexRouter from "./routes/index";

const app = express();
app.use(express.json());
app.use('/', indexRouter);

var port = normalizePort(process.env.PORT || '3000');
const server = http.createServer(app);

main();

async function main() {
    await connect();
    server.listen(port);
}

function normalizePort(val: string) {
    var port = parseInt(val, 10);
    if (isNaN(port)) {
        // named pipe
        return val;
    }
    if (port >= 0) {
        // port number
        return port;
    }
    return false;
}
