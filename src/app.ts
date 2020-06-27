import { errors } from 'celebrate';
import cors from 'cors';
import express, {
    NextFunction,
    Request,
    Response,
} from 'express';

import { Routes } from './routes/routes';

class App {
    public app: express.Application;
    public route: Routes = new Routes();

    constructor() {
        this.app = express();
        this.config();
        this.route.routes(this.app);
    }

    private config(): void {
        this.app.use(express.json());
        this.app.use(errors());
        this.app.use(App.logRequests);
        this.app.use(cors({
            // TODO: define cors origin when domain gets done
            origin: 'www.localhost',
        }));
    }

    private static logRequests(request: Request, response: Response, next: NextFunction) {
        const { method, url } = request;

        const logLabel = `[${method.toUpperCase()} ${url}]`;
        console.time(logLabel);
        next();
        console.timeEnd(logLabel);
    }

}

export default new App().app;



