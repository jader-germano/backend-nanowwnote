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
        const workspace = workspaceRepository.create({
            title,
            owner_id,
        });
        return await workspaceRepository.saveWorkspace(workspace);
    }
}
