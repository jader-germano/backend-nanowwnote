import { Request, Response, Router } from 'express';
import { getCustomRepository } from 'typeorm';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import UsersRepository from '../repositories/UsersRepository';
import CreateUserService from '../services/usersService/CreateUserService';
import UpdateUsersService from '../services/usersService/UpdateUserService';

const usersRouter = Router();

usersRouter.use(ensureAuthenticated);

usersRouter.route('/users')
.get(async (request: Request, response: Response) => {
    try {
        const workspaceRepository = getCustomRepository(UsersRepository);
        const { page } = request.query;

        const users = await workspaceRepository.findAllUsers(Number(page));

        return response.json(users);
    } catch (e) {
        response.status(404).json({ error: e.message });
    }
})
.post(async (request: Request, response: Response) => {
    try {
        const createUsersService = new CreateUserService();

        const { name, email, password } = request.body;

        const user = await createUsersService.execute({
            name,
            email,
            password,
        });

        return response.json(user);
    } catch (e) {
        response.status(404).json({ error: e.message });
    }
})
.put(async (request: Request, response: Response) => {
    try {
        const updateUsersService = new UpdateUsersService();

        const { id, name, email, password } = request.body;

        const updateUsers = await updateUsersService.execute({
            id,
            name,
            email,
            password,
        });

        if (!updateUsers)
            return response.json({ message: 'No match found.' });

        return response.json(updateUsers);
    } catch (e) {
        return response.status(404).json({ error: e.message });
    }
});

usersRouter.route('/users/:id')
.get(async (request: Request, response: Response) => {
    try {
        const workspaceRepository = getCustomRepository(UsersRepository);

        const { id } = request.params;

        const user = await workspaceRepository.findUserById(id);

        if (!user) return response.json({ message: 'No match found.' });

        return response.json(user);
    } catch (e) {
        response.status(404).json({ error: e.message });
    }
})

.delete(async (request: Request, response: Response) => {
    try {
        const workspaceRepository = getCustomRepository(UsersRepository);

        const { id } = request.params;

        const removed = await workspaceRepository.removeUser(id);

        const removedStatus = {
            message: `Successfully deleted: ${removed}`,
            response: `${removed}`,
        };
        return response.json(removedStatus);
    } catch (e) {
        return response.status(404).json({ error: e.message });
    }
});

export default usersRouter;

