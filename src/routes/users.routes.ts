import { Request, Response, Router } from 'express';
import multer from 'multer';
import { getCustomRepository } from 'typeorm';
import uploadConfig from '../config/upload';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import UsersRepository from '../repositories/UsersRepository';
import CreateUserService from '../services/usersService/CreateUserService';
import UpdateAvatarUserService from '../services/usersService/UpdateAvatarUserService';
import UpdateUsersService from '../services/usersService/UpdateUserService';

const usersRouter = Router();

const upload = multer(uploadConfig);
usersRouter
    .route('/')
    .get(async (request: Request, response: Response) => {
        const workspaceRepository = getCustomRepository(UsersRepository);
        const { page } = request.query;

        const users = await workspaceRepository.findAllUsers();

        return response.json(users);
    })

    .post(async (request: Request, response: Response) => {
        const createUsersService = new CreateUserService();

        const { name, email, password } = request.body;

        const user = await createUsersService.execute({
            name,
            email,
            password,
        });

        return response.json(user);
    })

    .put(async (request: Request, response: Response) => {
        const updateUsersService = new UpdateUsersService();

        const { id, name, email, password } = request.body;

        const updateUsers = await updateUsersService.execute({
            id,
            name,
            email,
            password,
        });

        if (!updateUsers) return response.json({ message: 'No match found.' });

        return response.json(updateUsers);
    });

usersRouter
    .route('/:id')
    .get(async (request: Request, response: Response) => {
        const workspaceRepository = getCustomRepository(UsersRepository);

        const { id } = request.params;

        const user = await workspaceRepository.findUserById(id);

        if (!user) return response.json({ message: 'No match found.' });

        return response.json(user);
    })

    .delete(async (request: Request, response: Response) => {
        const workspaceRepository = getCustomRepository(UsersRepository);

        const { id } = request.params;

        const removed = await workspaceRepository.removeUser(id);

        const removedStatus = {
            message: `Successfully deleted: ${removed}`,
            response: `${removed}`,
        };
        return response.json(removedStatus);
    });
usersRouter
    .route('/avatar')
    .patch(
        ensureAuthenticated,
        upload.single('avatar'),
        async (request, response) => {
            const updateAvatarUserService = new UpdateAvatarUserService();

            const users = await updateAvatarUserService.execute({
                user_id: request.user.id,
                avatarFileName: request.file.filename,
            });
            return response.json(users);
        },
    );

export default usersRouter;
