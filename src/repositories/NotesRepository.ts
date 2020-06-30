import { EntityRepository, Repository } from 'typeorm';
import AppError from '../errors/AppError';
import Note from '../models/Note';

@EntityRepository(Note)
export default class NotesRepository extends Repository<Note> {
    public async findAllNotes(): Promise<Note[]> {
        const note = await this.find();
        return note;
    }

    public async findNoteById(id: string): Promise<Note | undefined> {
        const note = await this.findOne({
            where: { id },
        });
        return note;
    }

    public async saveNote({
        id,
        title,
        description,
        owner_id,
        ownerWorkSpace_id,
    }: Note): Promise<Note> {
        const note = await this.save({
            id,
            title,
            description,
            owner_id,
            ownerWorkSpace_id,
        });
        return note;
    }

    public async removeNote(id: string): Promise<boolean> {
        const toRemove = await this.findOne({
            where: { id },
        });
        if (toRemove === null) {
            throw new AppError(`Note with id '${id}' not found.`, 401);
        }
        await this.delete(id);
        return true;
    }
}
