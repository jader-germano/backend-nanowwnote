import mongoose from 'mongoose';
import Workspace from '../models/workspace/Workspace';
import { WorkspaceSchema } from '../models/workspace/WorkspaceSchema';

const WorkspaceMongo = mongoose.model('Workspace', WorkspaceSchema);

export default class WorkspaceRepository {
    public async findAll() {
        return await WorkspaceMongo.paginate({}, {});
    }

    public async find(id: string) {
        return WorkspaceMongo.findById(id);
    }

    public async create(workspace: Workspace) {
        return await WorkspaceMongo.create(workspace);
    }

    public async update(id: string, workspace: Workspace) {
        return WorkspaceMongo.findByIdAndUpdate(id, workspace, {
            new: true,
        });
    }

    public async remove(id: string) {
        await WorkspaceMongo.findByIdAndRemove(id)
        return true;
    }
}