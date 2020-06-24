import {
    Request,
    Response,
} from 'express';
import Workspace from '../models/workspace/Workspace';
import WorkspaceRepository from '../repositories/WorkspaceRepository';
import UpdateWorkspaceService from '../services/workspaceService/UpdateWorkspaceService';
import CreateWorkspaceService from '../services/workspaceService/CreateWorkspaceService';

const workspaceRepository = new WorkspaceRepository();

export default class WorkspaceController {
    public async index(request: Request, response: Response) {
        try {
            return response.json(await workspaceRepository.findAll());
        } catch (e) {
            return response.status(404).json({error: e.message});
        }
    }

    public async find(request: Request, response: Response) {
        try {
            const { id } = request.params;
            const workspace = await workspaceRepository.find(id);
            if (workspace === null) return response.json({ message: 'Not match found.' });
            return response.json(workspace);
        } catch (e) {
            return response.status(404).json({error: e.message});
        }
    }

    public async create(request: Request, response: Response) {
        try {
            const createWorkspaceService = new CreateWorkspaceService(
                workspaceRepository,
            )

            return response.json(await createWorkspaceService.execute(new Workspace(request.body)));
        } catch (e) {
            return response.status(404).json({error: e.message});
        }
    }

    public async update(request: Request, response: Response) {
        try {
            const updateWorkspaceService = new UpdateWorkspaceService(
                workspaceRepository,
            );

            const { id } = request.params;

            const updateNote = await updateWorkspaceService.execute(id, new Workspace(request.body));

            if (updateNote === null) return response.json({ message: 'No match found.' });

            return response.json(updateNote);
        } catch (e) {
            return response.status(404).json({error: e.message});
        }

    }

    public async remove(request: Request, response: Response) {
        try {
            const { id } = request.params;

            const removed = await workspaceRepository.remove(id);

            return response.json({
                message: `Successfully deleted: ${removed}`,
                response: `${removed}`,
            });
        } catch (e) {
            return response.status(404).json({error: e.message})
        }

    }
}