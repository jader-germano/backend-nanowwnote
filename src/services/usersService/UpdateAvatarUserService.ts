import fs from 'fs';
import path from 'path';
import { getCustomRepository } from 'typeorm';
import uploadConfig from '../../config/upload';
import AppError from '../../errors/AppError';
import User from '../../models/User';
import UsersRepository from '../../repositories/UsersRepository';

interface Request {
    user_id: string;
    avatarFileName: string;
}

export default class UpdateAvatarUserService {
    public async execute({ user_id, avatarFileName }: Request): Promise<User> {
        const usersRepository = getCustomRepository(UsersRepository);
        const user = await usersRepository.findOne(user_id);

        if (!user) {
            throw new AppError(
                'Only authenticate users can change Avatar.',
                401,
            );
        }

        if (user.avatar) {
            const userAvatarFilePath = path.join(
                uploadConfig.directory,
                user.avatar,
            );
            const userAvatarFileExists = await fs.promises.stat(
                userAvatarFilePath,
            );
            if (userAvatarFileExists) {
                await fs.promises.unlink(userAvatarFilePath);
            }
        }
        user.avatar = avatarFileName;
        await usersRepository.saveUser(user);
        delete user.password;
        return user;
    }
}
