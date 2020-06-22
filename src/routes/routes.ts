import express from 'express';
import { NoteRoutes } from './note.routes';
import { WorkspaceRoutes } from './workspace.routes';

/*import {
 celebrate,
 Joi
 } from 'celebrate';*/

export class Routes {
    public noteController: NoteRoutes = new NoteRoutes();
    public workspaceController: WorkspaceRoutes = new WorkspaceRoutes();

    public routes(app: express.Application): void {
        this.noteController.routes(app);
        this.workspaceController.routes(app);
    }
}


