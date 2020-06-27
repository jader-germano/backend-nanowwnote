import { getCustomRepository } from 'typeorm';
import WorkspaceRepository from '../../repositories/WorkspaceRepository';

interface Request {
    id: string;

    title: string;

    date: Date;

}

export default class CreateWorkspaceService {

    public async execute({ id, title, date }: Request) {
        const workspaceRepository = getCustomRepository(
            WorkspaceRepository,
        );
        return await workspaceRepository.saveWorkspace({
            id,
            title,
            date
        });
    }
}
