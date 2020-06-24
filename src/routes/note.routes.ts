import express from 'express';
import NoteController from '../controllers/NoteController';

const noteController: NoteController = new NoteController();

export class NoteRoutes {

    public routes(app: express.Application): void {
        app.route('/note').
        get(noteController.index)
        .post(noteController.create);

        app.route('/note/:id')
        .get(noteController.find)
        .put(noteController.update)
        .delete(noteController.remove);
    }
}
