import { getCustomRepository } from 'typeorm';
import Note from '../../models/Note';
import NotesRepository from '../../repositories/NotesRepository';

interface Request {
    title: string;

    description: string;

    owner_id: string;

    ownerWorkSpace_id: string;
}

export default class CreateNoteService {
    public async execute({
        title,
        description,
        owner_id,
        ownerWorkSpace_id,
    }: Request): Promise<Note | null> {
        const noteRepository = getCustomRepository(NotesRepository);
        const note = await noteRepository.create({
            title,
            description,
            owner_id,
            ownerWorkSpace_id,
        });
        return await noteRepository.saveNote(note);
    }
}
