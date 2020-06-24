import express from 'express';
import { NoteRoutes } from './note.routes';
import { WorkspaceRoutes } from './workspace.routes';

export class Routes {
    private noteController: NoteRoutes = new NoteRoutes();
    private workspaceController: WorkspaceRoutes = new WorkspaceRoutes();

    public routes(app: express.Application): void {
        this.noteController.routes(app);
        this.workspaceController.routes(app);
    }
}


