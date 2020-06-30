import { getCustomRepository } from 'typeorm';
import AppError from '../../errors/AppError';
import User from '../../models/User';
import UsersRepository from '../../repositories/UsersRepository';

interface Request {
    id: string;

    name: string;

    email: string;

    password: string;
}

export default class CreateUsersService {
    public async execute({
        id,
        name,
        email,
        password,
    }: Request): Promise<User> {
        const usersRepository = getCustomRepository(UsersRepository);

        const checkUsersExists = await usersRepository.find({
            where: { id, email },
        });

        if (checkUsersExists.length > 1) {
            throw new AppError('Email address already in use.', 401);
        }

        let user = usersRepository.create({
            id,
            name,
            email,
            password,
        });
        user = await usersRepository.saveUser(user);
        return user;
    }
}
