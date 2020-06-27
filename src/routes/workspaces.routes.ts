import express from 'express';
import WorkspacesController from '../controllers/WorkspacesController';

const workspaceController: WorkspacesController = new WorkspacesController();

export class WorkspacesRoutes {
    public routes(app: express.Application): void {
        app.route('/workspaces/')
            .get(workspaceController.index)
            .put(workspaceController.update)
            .post(workspaceController.create);

        app.route('/workspaces/:id')
            .get(workspaceController.find)
            .delete(workspaceController.remove);
    }
}
