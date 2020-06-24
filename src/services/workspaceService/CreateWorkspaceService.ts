import WorkspaceRepository from '../../repositories/WorkspaceRepository';

interface Request {
    _id: string;

    title: string;

    description: string;

}

export default class CreateWorkspaceService {
    private workspaceRepository = new WorkspaceRepository();

    constructor(workspaceRepository: WorkspaceRepository) {
        this.workspaceRepository = workspaceRepository;
    }

    public async execute({ _id, title, description }: Request) {
        return await this.workspaceRepository.create({
            _id,
            title,
            description,
        });
    }
}