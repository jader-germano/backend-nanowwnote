import NoteRepository from '../../repositories/NoteRepository';

interface Request {
    _id: string;

    title: string;

    description: string;

}

export default class CreateNoteService {
    private noteRepository = new NoteRepository();

    constructor(noteRepository: NoteRepository) {
        this.noteRepository = noteRepository;
    }

    public async execute({ _id, title, description }: Request) {
        return await this.noteRepository.create({
            _id,
            title,
            description,
        });
    }
}