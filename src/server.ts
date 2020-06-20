import express from 'express';
import { errors } from 'celebrate';
import cors from 'cors';
import routes from './routes'

const app = express();

app.use(cors({
    // TODO: define cors origin when domain gets done
    /*  origin: 'www'*/
}));
app.use(express.json());
app.use(errors());
app.use(routes);

app.listen(3335);