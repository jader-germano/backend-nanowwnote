import { EntityRepository, Repository } from 'typeorm';
import AppError from '../errors/AppError';
import Workspace from '../models/Workspace';

@EntityRepository(Workspace)
export default class WorkspacesRepository extends Repository<Workspace> {
    public async findAllWorkspaces(): Promise<Workspace[]> {
        const workspace = await this.find();
        return workspace;
    }

    public async findWorkspaceById(id: string): Promise<Workspace | undefined> {
        const workspace = await this.findOne({
            where: { id },
        });
        return workspace;
    }

    public async saveWorkspace({
        id,
        title,
        owner_id,
    }: Workspace): Promise<Workspace> {
        const workspace = await this.save({ id, title, owner_id });

        return workspace;
    }

    public async removeWorkspace(id: string): Promise<boolean> {
        const toRemove = await this.findOne({
            where: { id },
        });
        if (toRemove === null) {
            throw new AppError(`Note with id '${id}' not found.`, 401);
        }
        await this.delete(id);
        return true;
    }
}
