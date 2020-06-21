import express, {
    NextFunction,
    Request,
    Response
} from 'express';
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
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(errors());
        this.app.use(App.logRequests);
        this.app.use(this.validateRepositoryId)
        this.app.use(cors({
            // TODO: define cors origin when domain gets done
            origin: 'www.localhost'
        }));
    }

    private static logRequests(request: Request, response: Response, next: NextFunction) {
        const { method, url } = request;

        const logLabel = `[${method.toUpperCase()} ${url}]`;
        console.time(logLabel);
        next();
        console.timeEnd(logLabel);
    }

    private validateRepositoryId(request: Request, response: Response, next: NextFunction) {
        console.log(request.query.key);
        if (request.query.key !== '80119d2dc53e77684a0c857048f659de7425dc9f') {
            response.status(401).send('You shall not pass!');
        } else {
           next();
        }
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



