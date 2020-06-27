import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import WorkspacesRepository from '../repositories/WorkspacesRepository';
import UpdateWorkspaceService from '../services/workspacesService/UpdateWorkspaceService';
import CreateWorkspaceService from '../services/workspacesService/CreateWorkspaceService';

export default class WorkspacesController {
    public async index(request: Request, response: Response) {
        try {
            const workspaceRepository = getCustomRepository(
                WorkspacesRepository,
            );
            return response.json(await workspaceRepository.findAllWorkspaces());
        } catch (e) {
            return response.status(404).json({ error: e.message });
        }
    }

    public async find(request: Request, response: Response) {
        try {
            const workspaceRepository = getCustomRepository(
                WorkspacesRepository,
            );
            const { id } = request.params;
            const workspace = await workspaceRepository.findWorkspaceById(id);
            if (workspace === null)
                return response.json({ message: 'Not match found.' });
            return response.json(workspace);
        } catch (e) {
            return response.status(404).json({ error: e.message });
        }
    }

    public async create(request: Request, response: Response) {
        try {
            const createWorkspaceService = new CreateWorkspaceService();
            const { title, owner_id } = request.body;
            return response.json(
                await createWorkspaceService.execute({ title, owner_id }),
            );
        } catch (e) {
            return response.status(404).json({ error: e.message });
        }
    }

    public async update(request: Request, response: Response) {
        try {
            const updateWorkspaceService = new UpdateWorkspaceService();

            const { id, title, owner_id } = request.body;

            const updateNote = await updateWorkspaceService.execute({
                id,
                title,
                owner_id,
            });

            if (updateNote === null)
                return response.json({ message: 'No match found.' });

            return response.json(updateNote);
        } catch (e) {
            return response.status(404).json({ error: e.message });
        }
    }

    public async remove(request: Request, response: Response) {
        try {
            const workspaceRepository = getCustomRepository(
                WorkspacesRepository,
            );
            const { id } = request.params;

            const removed = await workspaceRepository.removeWorkspace(id);

            return response.json({
                message: `Successfully deleted: ${removed}`,
                response: `${removed}`,
            });
        } catch (e) {
            return response.status(404).json({ error: e.message });
        }
    }
}
