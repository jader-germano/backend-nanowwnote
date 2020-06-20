import express from 'express';
import mongoose from "mongoose";
import * as bodyParser from 'body-parser';
import { errors } from 'celebrate';
import cors from 'cors';

import { Routes } from './routes/routes'

class App {
    public app: express.Application;
    public route: Routes = new Routes();
    public mongoUrl: string = 'mongodb://localhost:27017/nanowwnote';

    constructor() {
        this.app = express();
        this.config();
        this.route.routes(this.app);
        this.mongoSetup().then();
    }

    private config(): void {
        /**
         * support application/json type post data
         */
        this.app.use(bodyParser.json());
        /**
         *  support application/x-www-form-urlencoded post data
         */
        this.app.use(bodyParser.urlencoded({ extended: false }));
        /**
         *  support application/x-www-form-urlencoded post data
         */
        this.app.use(errors());
        this.app.use(cors({
            // TODO: define cors origin when domain gets done
            /*  origin: 'www'*/
        }));
    }

    private async mongoSetup() {
        const mongoConfig = {
            autoIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
        };
        mongoose.Promise = global.Promise;
        await mongoose.connect(this.mongoUrl, mongoConfig);

    }
}

export default new App().app;



