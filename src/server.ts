import 'reflect-metadata';
import app from './app';
import './database';
import https from 'https';
import fs from 'fs';

const PORT = 3333;
const httpOptions = {
    hostname: 'www.localhost',
    rejectUnauthorized: false,
    cert: fs.readFileSync('src/config/localhost.crt'),
    key: fs.readFileSync('src/config/localhost.key'),
};

https.createServer(httpOptions, app).listen(PORT,() => {
    console.log(`Server started on port ${PORT}`);
});
