import WorkspaceRepository from '../../repositories/WorkspaceRepository';

interface Request {

    title: string;

    description: string;

}

export default class UpdateNoteService {
    private workspaceRepository = new WorkspaceRepository();

    constructor(workspaceRepository: WorkspaceRepository) {
        this.workspaceRepository = workspaceRepository;
    }

    public async execute(id: string, { title, description }: Request) {
        return await this.workspaceRepository.update(id, {
            title,
            description,
        });
    }
}