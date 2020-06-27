import { getCustomRepository } from 'typeorm';
import NoteRepository from '../../repositories/NoteRepository';

interface Request {
    id: string;

    title: string;

    description: string;

    date: Date;

}

export default class UpdateNoteService {

    public async execute({ id, title, description, date }: Request) {
        const noteRepository = getCustomRepository(
            NoteRepository,
        );
        return await noteRepository.saveNote({
            id,
            title,
            description,
            date
        });
    }
}
