import { getCustomRepository } from 'typeorm';
import UsersRepository from '../../repositories/UsersRepository';

interface Request {
    name: string;

    email: string;

    password: string;
}

export default class CreateUserService {
    public async execute({ name, email, password }: Request) {
        const usersRepository = getCustomRepository(UsersRepository);
        const checkUsersExists = await usersRepository.findOne({
            where: { email },
        });

        if (checkUsersExists) {
            throw Error('Email address already in use.');
        }
        const user = usersRepository.create({
            name,
            email,
            password,
        });

        return await usersRepository.saveUser(user);
    }
}
