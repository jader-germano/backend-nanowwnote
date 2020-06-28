import { hash } from 'bcryptjs';
import { getRepository } from 'typeorm';
import AppError from '../../errors/AppError';
import User from '../../models/User';

interface Request {
    name: string;

    email: string;

    password: string;
}

export default class CreateUserService {
    public async execute({ name, email, password }: Request): Promise<User> {
        const usersNotesRepository = getRepository(User);

        const checkUsersExists = await usersNotesRepository.findOne({
            where: { email },
        });

        if (checkUsersExists) {
            throw new AppError('Email address already in use.', 401);
        }

        const hashedPassword = await hash(password, 8);

        let user = usersNotesRepository.create({
            name,
            email,
            password: hashedPassword,
        });

        user = await usersNotesRepository.save(user);
        delete user.password;
        return user;
    }
}
