import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import NotesRepository from '../repositories/NotesRepository';
import CreateNoteService from '../services/notesService/CreateNoteService';
import UpdateNoteService from '../services/notesService/UpdateNoteService';

export default class NotesController {
    public async index(request: Request, response: Response) {
        try {
            const noteRepository = getCustomRepository(NotesRepository);
            const { page } = request.query;

            return response.json(
                await noteRepository.findAllNotes(Number(page)),
            );
        } catch (e) {
            response.status(404).json({ error: e.message });
        }
    }

    public async find(request: Request, response: Response) {
        try {
            const noteRepository = getCustomRepository(NotesRepository);
            const { id } = request.params;
            const note = await noteRepository.findNoteById(id);
            if (note === null)
                return response.json({ message: 'No match found.' });
            return response.json(note);
        } catch (e) {
            response.status(404).json({ error: e.message });
        }
    }

    public async create(request: Request, response: Response) {
        try {
            const createNoteService = new CreateNoteService();
            const {
                title,
                description,
                owner_id,
                ownerWorkSpace_id,
            } = request.body;

            return response.json(
                await createNoteService.execute({
                    title,
                    description,
                    owner_id,
                    ownerWorkSpace_id,
                }),
            );
        } catch (e) {
            response.status(404).json({ error: e.message });
        }
    }

    public async update(request: Request, response: Response) {
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
    }

    public async remove(request: Request, response: Response) {
        try {
            const noteRepository = getCustomRepository(NotesRepository);
            const { id } = request.params;

            const removed = await noteRepository.removeNote(id);

            return response.json({
                message: `Successfully deleted: ${removed}`,
                response: `${removed}`,
            });
        } catch (e) {
            return response.status(404).json({ error: e.message });
        }
    }
}
