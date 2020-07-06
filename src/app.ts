import { errors } from 'celebrate';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';

import AppError from './errors/AppError';
import upload from './config/upload';
import routes from './routes/routes';

class App {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();
    }

    private config(): void {
        this.app.use(express.json());
        this.app.use(cors());
        this.app.use(routes);
        this.app.use(errors());
        this.app.use(App.logRequests);
        this.app.use('/files', express.static(upload.directory));
        this.errHandling();
    }

    private errHandling(): void {
        this.app.use(
            (
                err: Error,
                request: Request,
                response: Response,
                _: NextFunction,
            ) => {
                if (err instanceof AppError) {
                    return response.status(err.statusCode).json({
                        status: 'error',
                        message: err.message,
                    });
                }
                return response.status(500).json({
                    status: 'error',
                    message: `Internal server error. Details: ${err}`,
                });
            },
        );
    }

    private static logRequests(
        error: Error,
        request: Request,
        _: Response,
        next: NextFunction,
    ) {
        const { method, url } = request;
        // eslint-disable-next-line no-console
        console.log(error);
        const logLabel = `[${method.toUpperCase()} ${url}]`;
        // eslint-disable-next-line no-console
        console.time(logLabel);
        next();
        // eslint-disable-next-line no-console
        console.timeEnd(logLabel);
    }
}

export default new App().app;
