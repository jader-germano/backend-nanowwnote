import { getCustomRepository } from 'typeorm';
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
    }: Request): Promise<User | null> {
        const usersRepository = getCustomRepository(UsersRepository);
        let checkUsersExists = await usersRepository.find({
            where: { id, email },
        });

        if (checkUsersExists.length > 1) {
            throw Error('Email address already in use.');
        }
        const user = usersRepository.create({
            id,
            name,
            email,
            password,
        });

        return await usersRepository.saveUser(user);
    }
}
