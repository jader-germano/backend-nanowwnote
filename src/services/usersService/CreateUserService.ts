import { hash } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import AppError from '../../errors/AppError';
import User from '../../models/User';
import UsersRepository from '../../repositories/UsersRepository';

interface Request {
    name: string;

    email: string;

    password: string;
}

export default class CreateUserService {
    public async execute({ name, email, password }: Request): Promise<User> {
        const usersRepository = getCustomRepository(UsersRepository);

        const checkUsersExists = await usersRepository.findOne({
            where: { email },
        });

        if (checkUsersExists) {
            throw new AppError('Email address already in use.', 401);
        }

        const hashedPassword = await hash(password, 8);

        let user = usersRepository.create({
            name,
            email,
            password: hashedPassword,
        });

        user = await usersRepository.saveUser(user);
        delete user.password;
        return user;
    }
}
