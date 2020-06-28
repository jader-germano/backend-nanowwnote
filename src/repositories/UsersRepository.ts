import { EntityRepository, Repository } from 'typeorm';
import AppError from '../errors/AppError';
import User from '../models/User';

@EntityRepository(User)
export default class UsersRepository extends Repository<User> {
    public async findAllUsers(): Promise<User[]> {
        const user = await this.find();
        return user;
    }

    public async findUserById(id: string): Promise<User | undefined> {
        const user = await this.findOne({
            where: { id },
        });
        return user;
    }

    public async saveUser({ id, name, email, password }: User): Promise<User> {
        const user = await this.save({ id, name, email, password });
        return user;
    }

    public async removeUser(id: string): Promise<boolean> {
        const toRemove = await this.findOne({
            where: { id },
        });
        if (toRemove === null) {
            throw new AppError(`User with id '${id}' not found.`, 401);
        }
        await this.delete(id);
        return true;
    }
}
