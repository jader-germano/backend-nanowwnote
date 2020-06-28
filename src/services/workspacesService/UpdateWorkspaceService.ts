import { getCustomRepository } from 'typeorm';
import Workspace from '../../models/Workspace';
import WorkspacesRepository from '../../repositories/WorkspacesRepository';

interface Request {
    id: string;
    title: string;
    owner_id: string;
}

export default class UpdateWorkspaceService {
    public async execute({ id, title, owner_id }: Request): Promise<Workspace> {
        const workspaceRepository = getCustomRepository(WorkspacesRepository);
        let workspace = workspaceRepository.create({
            id,
            title,
            owner_id,
        });
        workspace = await workspaceRepository.saveWorkspace(workspace);
        return workspace;
    }
}
