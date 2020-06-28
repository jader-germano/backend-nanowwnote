import { Request, Response, Router } from 'express';
import { getCustomRepository } from 'typeorm';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import WorkspacesRepository from '../repositories/WorkspacesRepository';
import CreateWorkspaceService from '../services/workspacesService/CreateWorkspaceService';
import UpdateWorkspaceService from '../services/workspacesService/UpdateWorkspaceService';

const workspacesRouter = Router();

workspacesRouter.use(ensureAuthenticated);

workspacesRouter
    .route('/')
    .get(async (request: Request, response: Response) => {
        const workspaceRepository = getCustomRepository(WorkspacesRepository);
        const workspaces = await workspaceRepository.findAllWorkspaces();

        return response.json(workspaces);
    })
    .post(async (request: Request, response: Response) => {
        const createWorkspaceService = new CreateWorkspaceService();

        const { title, owner_id } = request.body;

        const workspace = await createWorkspaceService.execute({
            title,
            owner_id,
        });

        return response.json(workspace);
    })
    .put(async (request: Request, response: Response) => {
        const updateWorkspaceService = new UpdateWorkspaceService();

        const { id, title, owner_id } = request.body;

        const updateNote = await updateWorkspaceService.execute({
            id,
            title,
            owner_id,
        });

        if (!updateNote) return response.json({ message: 'No match found.' });

        return response.json(updateNote);
    });

workspacesRouter
    .route('/:id')
    .get(async (request: Request, response: Response) => {
        const { id } = request.params;

        const workspace = await getCustomRepository(
            WorkspacesRepository,
        ).findWorkspaceById(id);

        if (!workspace) return response.json({ message: 'Not match found.' });

        return response.json(workspace);
    })
    .delete(async (request: Request, response: Response) => {
        const { id } = request.params;

        const removed = await getCustomRepository(
            WorkspacesRepository,
        ).removeWorkspace(id);

        const removedStatus = {
            message: `Successfully deleted: ${removed}`,
            response: `${removed}`,
        };
        return response.json(removedStatus);
    });

export default workspacesRouter;
