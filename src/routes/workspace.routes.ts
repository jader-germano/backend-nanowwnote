import express from 'express';
import WorkspaceController from '../controllers/WorkspaceController';

const workspaceController: WorkspaceController = new WorkspaceController();

export class WorkspaceRoutes {

    public routes(app: express.Application): void {
        app.route('/workspace/')
        .get(workspaceController.index)
        .post(workspaceController.create);

        app.route('/workspace/:id')
        .get(workspaceController.find)
        .put(workspaceController.update)
        .delete(workspaceController.remove);
    }
}