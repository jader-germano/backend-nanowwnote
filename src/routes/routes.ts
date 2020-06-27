import express from 'express';
import { NotesRoutes } from './notes.routes';
import { UsersRoutes } from './users.routes';
import { WorkspacesRoutes } from './workspaces.routes';

export class Routes {
    private notesRoutes: NotesRoutes = new NotesRoutes();
    private workspacesRoutes: WorkspacesRoutes = new WorkspacesRoutes();
    private usersRoutes: UsersRoutes = new UsersRoutes();

    public routes(app: express.Application): void {
        this.notesRoutes.routes(app);
        this.workspacesRoutes.routes(app);
        this.usersRoutes.routes(app);
    }
}
