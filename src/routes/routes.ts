import { Router } from 'express';
import noteRouter from './notes.routes';
import usersRouter from './users.routes';
import workspacesRouter from './workspaces.routes';
import authenticationRoutes from  './authentications.routes'

const routes = Router();

routes.use('/', authenticationRoutes);
routes.use('/', workspacesRouter);
routes.use('/', noteRouter);
routes.use('/', usersRouter);

export default routes;
