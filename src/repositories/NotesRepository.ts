import { EntityRepository, Repository } from 'typeorm';
import Note from '../models/Note';

@EntityRepository(Note)
export default class NotesRepository extends Repository<Note> {
    public async findAllNotes(page: number): Promise<Note[] | null> {
        return (await this.find()) || null;
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

    public async saveNote({
        id,
        title,
        description,
        owner_id,
        ownerWorkSpace_id,
    }: Note): Promise<Note | null> {
        return await this.save({
            id,
            title,
            description,
            owner_id,
            ownerWorkSpace_id,
        });
    }

    public async removeNote(id: string): Promise<boolean> {
        const toRemove = await this.findOne({
            where: { id },
        });
        if (toRemove === null) {
            throw Error(`Note with id '${id}' not found.`);
        }
        await this.delete(id);
        return true;
    }
}
