import {
    DeleteResult,
    EntityRepository,
    Repository,
} from 'typeorm';
import Note from '../models/Note';

@EntityRepository(Note)
export default class NoteRepository extends Repository<Note> {

    public async findAllNotes(page: number): Promise<Note[] | null> {
        return await this.find() || null;
    }

    public async findNoteByDate(id: string): Promise<Note | null> {
        const findNote = await this.findOne({
            where: { id },
        });
        return findNote || null;
    }

    public async findNoteById(id: string) {
        return await this.findOne({
            where: { id },
        });
    }

    public async saveNote({ id, title, description, date }: Note): Promise<Note | null> {
        const note = await this.create({
            id,
            title,
            description,
            date,
        });
        return await this.save(note);
    }

    public async removeNote(id: string): Promise<DeleteResult> {
        const toRemove = await this.findOne({
            where: { id },
        });
        if (toRemove === null) {
            throw Error(`Note with id '${id}' not found.`);
        }
        return await this.delete(id)
    }
}
