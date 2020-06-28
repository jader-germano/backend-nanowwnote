import { Request, Response, Router } from 'express';
import { getCustomRepository } from 'typeorm';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import WorkspacesRepository from '../repositories/WorkspacesRepository';
import CreateWorkspaceService from '../services/workspacesService/CreateWorkspaceService';
import UpdateWorkspaceService from '../services/workspacesService/UpdateWorkspaceService';

const workspacesRouter = Router();

workspacesRouter.use(ensureAuthenticated);

workspacesRouter.route('/workspaces/')
.get(async (request: Request, response: Response) => {
    try {
        const workspaceRepository = getCustomRepository(
            WorkspacesRepository,
        );
        const workspaces = await workspaceRepository.findAllWorkspaces();

        return response.json(workspaces);
    } catch (e) {
        return response.status(404).json({ error: e.message });
    }
})
.post(async (request: Request, response: Response) => {
    try {
        const createWorkspaceService = new CreateWorkspaceService();

        const { title, owner_id } = request.body;

        const workspace = await createWorkspaceService.execute({
            title,
            owner_id,
        });

        return response.json(workspace);
    } catch (e) {
        return response.status(404).json({ error: e.message });
    }
})
.put(async (request: Request, response: Response) => {
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
});

workspacesRouter.route('/workspaces/:id')
.get( async (request: Request, response: Response) => {
    try {
        const { id } = request.params;

        const workspace = await getCustomRepository(
            WorkspacesRepository,
        ).findWorkspaceById(id);

        if (workspace === null)
            return response.json({ message: 'Not match found.' });

        return response.json(workspace);
    } catch (e) {
        return response.status(404).json({ error: e.message });
    }
})
.delete( async (request: Request, response: Response) => {
    try {
        const { id } = request.params;

        const removed = await getCustomRepository(
            WorkspacesRepository,
        ).removeWorkspace(id);

        const removedStatus = {
            message: `Successfully deleted: ${removed}`,
            response: `${removed}`,
        };
        return response.json(removedStatus);
    } catch (e) {
        return response.status(404).json({ error: e.message });
    }
});

export default workspacesRouter;
