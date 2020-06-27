import {
    DeleteResult,
    EntityRepository,
    Repository,
} from 'typeorm';
import Workspace from '../models/Workspace';

@EntityRepository(Workspace)
export default class WorkspaceRepository extends Repository<Workspace> {

    public async findAllWorkspaces(): Promise<Workspace[] | null> {
        return await this.find();
    }

    public async findWorkspaceById(id: string): Promise<Workspace | null>  {
        const  workspace = await this.findOne({
            where: { id },
        });
        return workspace|| null;
    }

    public async saveWorkspace({ id, title, date }: Workspace) {
        const workspace = this.create({
            id,
            title,
            date,
        });

        return await this.save(workspace);
    }

    public async removeWorkspace(id: string): Promise<DeleteResult> {
        const toRemove = await this.find({ id });
        if (toRemove === null) {
            throw Error(`Note with id '${id}' not found.`);
        }
        return await this.delete(id);
    }
}
