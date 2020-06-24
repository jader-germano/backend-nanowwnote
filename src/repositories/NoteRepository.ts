import mongoose from 'mongoose';
import Note from '../models/note/Note';
import { NoteSchema } from '../models/note/NoteSchema';

interface NoteDTO {
    _id: string;

    title: string;

    description: string;

}

const noteMongo = mongoose.model('Notes', NoteSchema);

export default class NoteRepository {
    public async findAll(page: number) {
        return await noteMongo.paginate({}, {
            page: page,
        });
    }

    public find(id: string) {
        return noteMongo.findById(id);
    }

    public async create({ _id, title, description }: NoteDTO) {
        const note = new Note({
            _id,
            title,
            description,
        });
        return await noteMongo.create(note);
    }

    public update(id: string, { title, description }: Omit<NoteDTO, '_id'>) {
        return noteMongo.findByIdAndUpdate(id, {
            title,
            description,
        }, {
            new: true,
        });
    }

    public async remove(id: string) {
        const toRemove = await this.find(id);
        if (toRemove === null) {
            throw Error(`Note with id '${id}' not found.`);
        }
        return noteMongo.findByIdAndRemove(id).then(() => {
            return true;
        });


    }
}