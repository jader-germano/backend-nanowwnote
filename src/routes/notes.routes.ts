import express from 'express';
import NotesController from '../controllers/NotesController';

const noteController: NotesController = new NotesController();

export class NotesRoutes {
    public routes(app: express.Application): void {
        app.route('/notes')
            .get(noteController.index)
            .post(noteController.create)
            .put(noteController.update);

        app.route('/notes/:id')
            .get(noteController.find)
            .delete(noteController.remove);
    }
}
