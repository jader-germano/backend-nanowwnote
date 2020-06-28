import { hash } from 'bcryptjs';
import { getRepository } from 'typeorm';
import User from '../../models/User';

interface Request {
    name: string;

    email: string;

    password: string;
}

export default class CreateUserService {
    public async execute({ name, email, password }: Request) {
        const usersNotesRepository = getRepository(User);

        const checkUsersExists = await usersNotesRepository.findOne({
            where: { email },
        });

        if (checkUsersExists) {
            throw Error('Email address already in use.');
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
