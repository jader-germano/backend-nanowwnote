import { getCustomRepository } from 'typeorm';
import Note from '../../models/Note';
import NotesRepository from '../../repositories/NotesRepository';

interface Request {
    id: string;

    title: string;

    description: string;

    owner_id: string;

    ownerWorkSpace_id: string;
}

export default class UpdateNoteService {
    public async execute({
        id,
        title,
        description,
        owner_id,
        ownerWorkSpace_id,
    }: Request): Promise<Note | null> {
        const noteRepository = getCustomRepository(NotesRepository);

        let note = await noteRepository.create({
            id,
            title,
            description,
            owner_id,
            ownerWorkSpace_id,
        });
        note = await noteRepository.saveNote(note);
        return note;
    }
}
