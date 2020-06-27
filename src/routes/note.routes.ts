import express from 'express';
import NoteController from '../controllers/NoteController';

const noteController: NoteController = new NoteController();

export class NoteRoutes {

    public routes(app: express.Application): void {
        app.route('/note').
        get(noteController.index)
        .post(noteController.create)
        .put(noteController.update);

        app.route('/note/:id')
        .get(noteController.find)
        .delete(noteController.remove);
    }
}
