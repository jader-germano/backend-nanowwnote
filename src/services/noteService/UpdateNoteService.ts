import NoteRepository from '../../repositories/NoteRepository';

interface Request {

    title: string;

    description: string;

}

export default class UpdateNoteService {
    private noteRepository = new NoteRepository();

    constructor(noteRepository: NoteRepository) {
        this.noteRepository = noteRepository;
    }

    public execute(id: string, { title, description }: Request) {
        return this.noteRepository.update(id, {
            title,
            description,
        });
    }
}