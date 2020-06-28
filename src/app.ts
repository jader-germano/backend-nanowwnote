import { errors } from 'celebrate';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';

import upload from './config/upload';
import AppError from './errors/AppError';
import routes from './routes/routes';

class App {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();
    }

    private config(): void {
        this.app.use(express.json());
        this.app.use('/files', express.static(upload.directory));
        this.app.use(routes);
        this.app.use(errors());
        this.app.use(App.logRequests);
        this.app.use(
            cors({
                // TODO: define cors origin when domain gets done
                origin: 'www.localhost',
            }),
        );
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
                    message: 'Internal server error',
                });
            },
        );
    }

    private static logRequests(
        request: Request,
        response: Response,
        next: NextFunction,
    ) {
        const { method, url } = request;

        const logLabel = `[${method.toUpperCase()} ${url}]`;
        console.time(logLabel);
        next();
        console.timeEnd(logLabel);
    }
}

export default new App().app;
