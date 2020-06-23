import mongoose from 'mongoose';
import Note from '../models/note/Note';
import { NoteSchema } from '../models/note/NoteSchema';

const NoteMongo = mongoose.model('Note', NoteSchema);

export default class NoteRepository {
    public async findAll(page: number) {
        return await NoteMongo.paginate({}, {
            page: page,
        });
    }

    public async find(id: string) {
        return NoteMongo.findById(id);
    }

    public async create(note: Note) {
        return await NoteMongo.create(note);
    }

    public async update(id: string, note: Note) {
        return NoteMongo.findByIdAndUpdate(id, note, {
            new: true,
        });
    }

    public async remove(id: string) {
        await NoteMongo.findByIdAndRemove(id)
        return true;
    }
}