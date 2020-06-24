import mongoose from 'mongoose';
import Workspace from '../models/workspace/Workspace';
import { WorkspaceSchema } from '../models/workspace/WorkspaceSchema';

interface WorkspaceDTO {
    _id: string;

    title: string;

    description: string;

}

const workspaceMongo = mongoose.model('Workspaces', WorkspaceSchema);

export default class WorkspaceRepository {
    public async findAll() {
        return await workspaceMongo.paginate({}, {});
    }

    public async find(id: string) {
        return workspaceMongo.findById(id);
    }

    public async create({ _id, title, description }: WorkspaceDTO) {
        const workspace = new Workspace({
            _id,
            title,
            description,
        });

        return await workspaceMongo.create(workspace);
    }

    public async update(id: string, { title, description }:  Omit<WorkspaceDTO, '_id'>) {
        return workspaceMongo.findByIdAndUpdate(id, {
            title,
            description,
        }, {
            new: true,
        });
    }

    public async remove(id: string) {
        const toRemove = await this.find(id);
        if (toRemove === null) {
            throw Error(`Note with id '${id}' not found.`);
        }
        return workspaceMongo.findByIdAndRemove(id).then(() => {
            return true;
        });

    }
}