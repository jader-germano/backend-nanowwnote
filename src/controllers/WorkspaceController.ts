import {
    Request,
    Response,
} from 'express';
import { getCustomRepository } from 'typeorm';
import WorkspaceRepository from '../repositories/WorkspaceRepository';
import UpdateWorkspaceService from '../services/workspaceService/UpdateWorkspaceService';
import CreateWorkspaceService from '../services/workspaceService/CreateWorkspaceService';



export default class WorkspaceController {
    public async index(request: Request, response: Response) {
        try {
            const workspaceRepository = getCustomRepository(WorkspaceRepository);
            return response.json(await workspaceRepository.findAllWorkspaces());
        } catch (e) {
            return response.status(404).json({error: e.message});
        }
    }

    public async find(request: Request, response: Response) {
        try {
            const workspaceRepository = getCustomRepository(WorkspaceRepository);
            const { id } = request.params;
            const workspace = await workspaceRepository.findWorkspaceById(id);
            if (workspace === null) return response.json({ message: 'Not match found.' });
            return response.json(workspace);
        } catch (e) {
            return response.status(404).json({error: e.message});
        }
    }

    public async create(request: Request, response: Response) {
        try {
            const createWorkspaceService = new CreateWorkspaceService();
            const { id, title, date } = request.body
            return response.json(await createWorkspaceService.execute({ id, title, date }));
        } catch (e) {
            return response.status(404).json({error: e.message});
        }
    }

    public async update(request: Request, response: Response) {
        try {
            const updateWorkspaceService = new UpdateWorkspaceService();

            const { id, title, date } = request.body

            const updateNote = await updateWorkspaceService.execute({ id, title, date });

            if (updateNote === null) return response.json({ message: 'No match found.' });

            return response.json(updateNote);
        } catch (e) {
            return response.status(404).json({error: e.message});
        }

    }

    public async remove(request: Request, response: Response) {
        try {
            const workspaceRepository = getCustomRepository(WorkspaceRepository);
            const { id } = request.params;

            const removed = await workspaceRepository.removeWorkspace(id);

            return response.json({
                message: `Successfully deleted: ${removed}`,
                response: `${removed}`,
            });
        } catch (e) {
            return response.status(404).json({error: e.message})
        }

    }
}
