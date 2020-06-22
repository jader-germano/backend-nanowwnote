import express from 'express';
import { NoteController } from '../controllers/note/NoteController'

export class NoteRoutes {
    public noteController: NoteController = new NoteController();

    public routes(app: express.Application): void {
        app.route('/note').get(this.noteController.index)
        .post(this.noteController.create);

        app.route('/note/:id')
        .get(this.noteController.find)
        .put(this.noteController.update)
        .delete(this.noteController.remove);
    }
}
