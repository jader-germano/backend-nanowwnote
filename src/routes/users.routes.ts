import express from 'express';
import UsersController from '../controllers/UsersController';

const usersController: UsersController = new UsersController();

export class UsersRoutes {
    public routes(app: express.Application): void {
        app.route('/users')
            .get(usersController.index)
            .post(usersController.create)
            .put(usersController.update);

        app.route('/users/:id')
            .get(usersController.find)
            .delete(usersController.remove);
    }
}
