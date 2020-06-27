import { EntityRepository, Repository } from 'typeorm';
import Workspace from '../models/Workspace';

@EntityRepository(Workspace)
export default class WorkspacesRepository extends Repository<Workspace> {
    public async findAllWorkspaces(): Promise<Workspace[] | null> {
        return await this.find();
    }

    public async findWorkspaceById(id: string): Promise<Workspace | null> {
        const workspace = await this.findOne({
            where: { id },
        });
        return workspace || null;
    }

    public async saveWorkspace({
        id,
        title,
        owner_id,
    }: Workspace): Promise<Workspace | null> {
        return await this.save({ id, title, owner_id });
    }

    public async removeWorkspace(id: string): Promise<boolean> {
        const toRemove = await this.findOne({
            where: { id },
        });
        if (toRemove === null) {
            throw Error(`Note with id '${id}' not found.`);
        }
        await this.delete(id);
        return true;
    }
}
