import mongoose from 'mongoose';
import { WorkspaceSchema } from '../../models/workspace/Workspace'
import {
    Request,
    Response
} from "express";

const Workspace = mongoose.model('Woorkspace', WorkspaceSchema);

export class WorkspaceController {
    public async index(request: Request, response: Response) {
        try {
            const { page } = request.query;
            const workspaces = await Workspace.paginate({}, {
                page: Number(page)
            });
            return response.json(workspaces);
        } catch (e) {
            response.send(e);
        }
    }

    public async find(request: Request, response: Response) {
        try {
            let { id } = request.params;
            const workspace = await Workspace.findById(id);
            return response.json(workspace);
        } catch (e) {
            return response.send(e);
        }
    }

    public async create(request: Request, response: Response) {
        try {
            let newWorkspace = new Workspace(request.body);
            const workspace = await Workspace.create(newWorkspace);
            return response.json(workspace);
        } catch (e) {
            return response.send(e);
        }
    }

    public async update(request: Request, response: Response) {
        try {
            let { id } = request.params;
            let updatedWorkspace = new Workspace(request.body);
            const workspace = await Workspace.findByIdAndUpdate(id, updatedWorkspace, {
                new: true
            });
            return response.json(workspace);
        } catch (e) {
            return response.send(e);
        }

    }

    public async remove(request: Request, response: Response) {
        try {
            let { id } = request.params;
            await Workspace.findByIdAndRemove(id);
            return response.json(true);
        } catch (e) {
            return response.send(e);
        }

    }
}