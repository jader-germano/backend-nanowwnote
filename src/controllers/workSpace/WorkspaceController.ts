import {
    Request,
    Response,
} from 'express';
import Workspace from '../../models/workspace/Workspace';
import WorkspaceRepository from '../../repositories/WorkspaceRepository';


const noteRepository = new WorkspaceRepository();

export class WorkspaceController {
    public async index(request: Request, response: Response) {
        try {
            return response.json(noteRepository.findAll());
        } catch (e) {
            response.status(404).json({error: e})
        }
    }

    public async find(request: Request, response: Response) {
        try {
            let { id } = request.params;

            return response.json(noteRepository.find(id));
        } catch (e) {
            return response.status(404).json({error: e})
        }
    }

    public async create(request: Request, response: Response) {
        try {
            let newWorkspace = new Workspace(request.body);

            return response.json(await noteRepository.create(newWorkspace));
        } catch (e) {
            return response.status(404).json({error: e})
        }
    }

    public async update(request: Request, response: Response) {
        try {
            let { id } = request.params;
            let updatedWorkspace = new Workspace(request.body);

            return response.json(await noteRepository.update(id, updatedWorkspace));
        } catch (e) {
            return response.status(404).json({error: e})
        }

    }

    public async remove(request: Request, response: Response) {
        try {
            let { id } = request.params;

            return response.json(await noteRepository.remove(id));
        } catch (e) {
            return response.status(404).json({error: e})
        }

    }
}