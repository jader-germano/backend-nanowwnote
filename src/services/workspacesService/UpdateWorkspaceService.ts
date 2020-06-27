import { getCustomRepository } from 'typeorm';
import Workspace from '../../models/Workspace';
import WorkspacesRepository from '../../repositories/WorkspacesRepository';

interface Request {
    id: string;
    title: string;
    owner_id: string;
}

export default class UpdateWorkspaceService {
    public async execute({
        id,
        title,
        owner_id,
    }: Request): Promise<Workspace | null> {
        const workspaceRepository = getCustomRepository(WorkspacesRepository);
        const workspace = workspaceRepository.create({
            id,
            title,
            owner_id,
        });
        return await workspaceRepository.saveWorkspace(workspace);
    }
}
