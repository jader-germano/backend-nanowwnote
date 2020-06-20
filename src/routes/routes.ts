import express, {
    Request,
    Response
} from 'express';
/*import {
 celebrate,
 Joi
 } from 'celebrate';*/
import { NoteController } from '../controllers/note/NoteController'
import { WorkspaceController } from "../controllers/workSpace/WorkspaceController";

export class Routes {
    public noteController: NoteController = new NoteController();
    public workspaceController: WorkspaceController = new WorkspaceController();

    public routes(app: express.Application): void {
        app.route('/').get((request: Request, response: Response) => {
            response.status(200).send({
                message: 'GET successful!!',
            })
        });
        app.route('/note').get(this.noteController.index)
        .post(this.noteController.create);
        app.route('/note/:id')
        .get(this.noteController.find)
        .put(this.noteController.update)
        .delete(this.noteController.remove);

        app.route('/workspace').get(this.workspaceController.index)
        .post(this.workspaceController.create);
        app.route('/workspace/:id')
        .get(this.workspaceController.find)
        .put(this.workspaceController.update)
        .delete(this.workspaceController.remove);
    }


}


