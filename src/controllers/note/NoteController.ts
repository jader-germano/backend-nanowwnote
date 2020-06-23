import {
    Request,
    Response,
} from 'express';
import Note from '../../models/note/Note';
import NoteRepository from '../../repositories/NoteRepository';


const noteRepository = new NoteRepository();

export class NoteController {
    public async index(request: Request, response: Response) {
        try {
            const { page } = request.query;

            return response.json(noteRepository.findAll(Number(page)));
        } catch (e) {
            return response.status(404).json({error: e});
        }
    }

    public async find(request: Request, response: Response) {
        try {
            let { id } = request.params;

            return response.json(noteRepository.find(id));
        } catch (e) {
            return response.status(404).json({error: e})
        }
    }

    public async create(request: Request, response: Response) {
        try {
            let newNote = new Note(request.body);

            return response.json(await noteRepository.create(newNote));
        } catch (e) {
            return response.status(404).json({error: e})
        }
    }

    public async update(request: Request, response: Response) {
        try {
            let { id } = request.params;
            let updatedNote = new Note(request.body);

            return response.json(await noteRepository.update(id, updatedNote));
        } catch (e) {
            return response.status(404).json({error: e})
        }

    }

    public async remove(request: Request, response: Response) {
        try {
            let { id } = request.params;

            return response.json(await noteRepository.remove(id));
        } catch (e) {
            return response.status(404).json({error: e})
        }

    }
}