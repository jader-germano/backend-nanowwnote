import { Request, Response, Router } from 'express';
import { getCustomRepository } from 'typeorm';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import NotesRepository from '../repositories/NotesRepository';
import CreateNoteService from '../services/notesService/CreateNoteService';
import UpdateNoteService from '../services/notesService/UpdateNoteService';

const noteRouter = Router();

noteRouter.use(ensureAuthenticated);

noteRouter.route('/notes')
.get( async (request: Request, response: Response) => {
    try {
        const { page } = request.query;

        const notes = await getCustomRepository(
            NotesRepository,
        ).findAllNotes(Number(page));

        return response.json(notes);
    } catch (e) {
        response.status(404).json({ error: e.message });
    }
})
.post(async (request: Request, response: Response) => {
    try {
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
    } catch (e) {
        response.status(404).json({ error: e.message });
    }
})
.put(async (request: Request, response: Response) => {
    try {
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

        if (updateNote === null)
            return response.json({ message: 'No match found.' });

        return response.json(updateNote);
    } catch (e) {
        return response.status(404).json({ error: e.message });
    }
});

noteRouter.route('/notes/:id')
.get( async (request: Request, response: Response) => {
    try {
        const { id } = request.params;
        const note = await getCustomRepository(
            NotesRepository,
        ).findNoteById(id);
        if (!note) return response.json({ message: 'No match found.' });
        return response.json(note);
    } catch (e) {
        response.status(404).json({ error: e.message });
    }
})
.delete( async (request: Request, response: Response) =>{
    try {
        const { id } = request.params;

        const removed = await getCustomRepository(
            NotesRepository,
        ).removeNote(id);

        const removedStatus = {
            message: `Successfully deleted: ${removed}`,
            response: `${removed}`,
        };
        return response.json(removedStatus);
    } catch (e) {
        return response.status(404).json({ error: e.message });
    }

    });

export default noteRouter;
