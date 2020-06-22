import express from 'express';

import { WorkspaceController } from '../controllers/workSpace/WorkspaceController';


export class WorkspaceRoutes {
    public workspaceController: WorkspaceController = new WorkspaceController();

    public routes(app: express.Application): void {

        app.route('/workspace').get(this.workspaceController.index)
        .post(this.workspaceController.create);

        app.route('/workspace/:id')
        .get(this.workspaceController.find)
        .put(this.workspaceController.update)
        .delete(this.workspaceController.remove);
    }
}