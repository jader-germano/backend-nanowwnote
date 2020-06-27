import express from 'express';
import WorkspaceController from '../controllers/WorkspaceController';

const workspaceController: WorkspaceController = new WorkspaceController();

export class WorkspaceRoutes {

    public routes(app: express.Application): void {
        app.route('/workspace/')
        .get(workspaceController.index)
        .put(workspaceController.update)
        .post(workspaceController.create);

        app.route('/workspace/:id')
        .get(workspaceController.find)
        .delete(workspaceController.remove);
    }
}
