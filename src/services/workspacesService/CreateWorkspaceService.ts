import { getCustomRepository } from 'typeorm';
import Workspace from '../../models/Workspace';
import WorkspacesRepository from '../../repositories/WorkspacesRepository';

interface Request {
    title: string;
    owner_id: string;
}

export default class CreateWorkspaceService {
    public async execute({
        title,
        owner_id,
    }: Request): Promise<Workspace | null> {
        const workspaceRepository = getCustomRepository(WorkspacesRepository);
        let workspace = workspaceRepository.create({
            title,
            owner_id,
        });
        workspace = await workspaceRepository.saveWorkspace(workspace);
        return workspace;
    }
}
