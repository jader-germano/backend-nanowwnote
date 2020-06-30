import 'reflect-metadata';
import https from 'https';
import fs from 'fs';
import app from './app';
import './database';

const PORT = 3335;
const httpOptions = {
    hostname: 'www.localhost',
    rejectUnauthorized: false,
    cert: fs.readFileSync('src/config/localhost.crt'),
    key: fs.readFileSync('src/config/localhost.key'),
};

https.createServer(httpOptions, app).listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server started on port ${PORT}`);
});
