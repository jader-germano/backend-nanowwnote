import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '../repositories/UsersRepository';
import CreateUserService from '../services/usersService/CreateUserService';
import UpdateUsersService from '../services/usersService/UpdateUserService';

export default class UsersController {
    public async index(request: Request, response: Response) {
        try {
            const usersRepository = getCustomRepository(UsersRepository);
            const { page } = request.query;

            return response.json(
                await usersRepository.findAllUsers(Number(page)),
            );
        } catch (e) {
            response.status(404).json({ error: e.message });
        }
    }

    public async find(request: Request, response: Response) {
        try {
            const usersRepository = getCustomRepository(UsersRepository);
            const { id } = request.params;
            const note = await usersRepository.findUserById(id);
            if (note === null)
                return response.json({ message: 'No match found.' });
            return response.json(note);
        } catch (e) {
            response.status(404).json({ error: e.message });
        }
    }

    public async create(request: Request, response: Response) {
        try {
            const createUsersService = new CreateUserService();
            const { name, email, password } = request.body;

            return response.json(
                await createUsersService.execute({ name, email, password }),
            );
        } catch (e) {
            response.status(404).json({ error: e.message });
        }
    }

    public async update(request: Request, response: Response) {
        try {
            const updateUsersService = new UpdateUsersService();
            const { id, name, email, password } = request.body;
            const updateUsers = await updateUsersService.execute({
                id,
                name,
                email,
                password,
            });

            if (updateUsers === null)
                return response.json({ message: 'No match found.' });

            return response.json(updateUsers);
        } catch (e) {
            return response.status(404).json({ error: e.message });
        }
    }

    public async remove(request: Request, response: Response) {
        try {
            const usersRepository = getCustomRepository(UsersRepository);
            const { id } = request.params;

            const removed = await usersRepository.removeUser(id);

            return response.json({
                message: `Successfully deleted: ${removed}`,
                response: `${removed}`,
            });
        } catch (e) {
            return response.status(404).json({ error: e.message });
        }
    }
}
