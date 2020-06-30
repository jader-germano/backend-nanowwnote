import { Request, Response, Router } from 'express';
import { getCustomRepository } from 'typeorm';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import NotesRepository from '../repositories/NotesRepository';
import CreateNoteService from '../services/notesService/CreateNoteService';
import UpdateNoteService from '../services/notesService/UpdateNoteService';

const noteRouter = Router();

noteRouter.use(ensureAuthenticated);

noteRouter
    .route('/')
    .get(async (request: Request, response: Response) => {
        const notes = await getCustomRepository(NotesRepository).findAllNotes();

        return response.json(notes);
    })
    .post(async (request: Request, response: Response) => {
        const createNoteService = new CreateNoteService();

        const {
            title,
            description,
            owner_id,
            ownerWorkSpace_id,
        } = request.body;

        const note = await createNoteService.execute({
            title,
            description,
            owner_id,
            ownerWorkSpace_id,
        });
        return response.json(note);
    })
    .put(async (request: Request, response: Response) => {
        const updateNoteService = new UpdateNoteService();
        const {
            id,
            title,
            description,
            owner_id,
            ownerWorkSpace_id,
        } = request.body;
        const updateNote = await updateNoteService.execute({
            id,
            title,
            description,
            owner_id,
            ownerWorkSpace_id,
        });

        if (!updateNote) return response.json({ message: 'No match found.' });

        return response.json(updateNote);
    });

noteRouter
    .route('/:id')
    .get(async (request: Request, response: Response) => {
        const { id } = request.params;
        const note = await getCustomRepository(NotesRepository).findNoteById(
            id,
        );
        if (!note) return response.json({ message: 'No match found.' });
        return response.json(note);
    })
    .delete(async (request: Request, response: Response) => {
        const { id } = request.params;

        const removed = await getCustomRepository(NotesRepository).removeNote(
            id,
        );

        const removedStatus = {
            message: `Successfully deleted: ${removed}`,
            response: `${removed}`,
        };
        return response.json(removedStatus);
    });

export default noteRouter;
