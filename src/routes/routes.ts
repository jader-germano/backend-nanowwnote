import { Router } from 'express';
import noteRouter from './notes.routes';
import usersRouter from './users.routes';
import workspacesRouter from './workspaces.routes';
import authenticationRoutes from './authentications.routes';

const routes = Router();

routes.use('/sessions', authenticationRoutes);
routes.use('/users', usersRouter);
routes.use('/notes', noteRouter);
routes.use('/workspaces', workspacesRouter);

export default routes;
