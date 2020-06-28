import { compare } from 'bcryptjs';
import { getRepository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import authConfig from '../config/auth';
import User from '../models/User';

interface Request {
    email: string;
    password: string;
}

interface Response {
    user: User;
    token: string;
}

export default class AuthenticateUserService {
    public async execute({ email, password }: Request): Promise<Response> {
        const usersNotesRepository = getRepository(User);

        const user = await usersNotesRepository.findOne({
            where: { email },
        });

        if (!user) {
            throw new Error('Incorrect email/password combination');
        }

        const passwordMatched = await compare(password, user.password);

        if (!passwordMatched) {
            throw new Error('Incorrect email/password combination');
        }

        delete user.password;

        const token = sign({},  authConfig.jwt.secret, {
            subject: user.id,
            expiresIn: '1d',
        });
        return {
            user,
            token,
        };
    }
}
