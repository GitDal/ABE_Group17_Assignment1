import connect from "./models/db";
import express from "express";
import http from "http";
import indexRouter from "./routes/index";
import SwaggerUi from 'swagger-ui-express';
import swaggerSpec from './swaggerSetup'
import userRouter from "./routes/user"

const app = express();
app.use(express.json());
app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/swagger', SwaggerUi.serve, SwaggerUi.setup(swaggerSpec));

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
