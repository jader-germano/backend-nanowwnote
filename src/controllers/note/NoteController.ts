import mongoose from 'mongoose';
import { NoteSchema } from '../../models/note/Note'
import {
    Request,
    Response
} from "express";

const Note = mongoose.model('Note', NoteSchema);

export class NoteController {
    public async index(request: Request, response: Response) {
        try {
            const { page } = request.query;
            const notes = await Note.paginate({}, {
                page: Number(page)
            });
            return response.json(notes);
        } catch (e) {
            response.send(e);
        }
    }

    public async find(request: Request, response: Response) {
        try {
            let { id } = request.params;
            const note = await Note.findById(id);
            return response.json(note);
        } catch (e) {
            return response.send(e);
        }
    }

    public async create(request: Request, response: Response) {
        try {
            let newNote = new Note(request.body);
            const note = await Note.create(newNote);
            return response.json(note);
        } catch (e) {
            return response.send(e);
        }
    }

    public async update(request: Request, response: Response) {
        try {
            let { id } = request.params;
            let updatedNote = new Note(request.body);
            const note = await Note.findByIdAndUpdate(id, updatedNote, {
                new: true
            });
            return response.json(note);
        } catch (e) {
            return response.send(e);
        }

    }

    public async remove(request: Request, response: Response) {
        try {
            let { id } = request.params;
            await Note.findByIdAndRemove(id);
            return response.json(true);
        } catch (e) {
            return response.send(e);
        }

    }
}