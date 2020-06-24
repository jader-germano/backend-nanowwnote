import {
    Request,
    Response,
} from 'express';
import Note from '../models/note/Note';
import NoteRepository from '../repositories/NoteRepository';
import CreateNoteService from '../services/noteService/CreateNoteService';
import UpdateNoteService from '../services/noteService/UpdateNoteService';

const noteRepository = new NoteRepository();

export default class NoteController {
    public async index(request: Request, response: Response) {
        try {
            const { page } = request.query;

            return response.json(await noteRepository.findAll(Number(page)));
        } catch (e) {
            response.status(404).json({error: e.message});
        }
    }

    public async find(request: Request, response: Response) {
        try {
            const { id } = request.params;
            const note = await noteRepository.find(id);
            if (note === null) return response.json({ message: 'No match found.' });
            return response.json(note);
        } catch (e) {
            response.status(404).json({error: e.message});
        }
    }

    public async create(request: Request, response: Response) {
        try {
            const createNoteService = new CreateNoteService(
                noteRepository,
            );

            return response.json(await createNoteService.execute(new Note(request.body)));
        } catch (e) {
            response.status(404).json({error: e.message});
        }
    }

    public async update(request: Request, response: Response) {
        try {
            const updateNoteService = new UpdateNoteService(
                noteRepository,
            );

            const { id } = request.params;

            const updateNote = await updateNoteService.execute(id, new Note(request.body))

            if (updateNote === null) return response.json({ message: 'No match found.' });

            return response.json(updateNote);
        } catch (e) {
            return response.status(404).json({error: e.message});
        }

    }

    public async remove(request: Request, response: Response) {
        try {
            const { id } = request.params;

            const removed = await noteRepository.remove(id);

            return response.json({
                message: `Successfully deleted: ${removed}`,
                response: `${removed}`,
            });
        } catch (e) {
            return response.status(404).json({ error: e.message })
        }

    }
}