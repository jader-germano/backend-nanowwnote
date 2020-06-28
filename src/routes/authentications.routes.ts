import { Request, Response, Router } from 'express';
import AuthenticateUserService from '../services/AuthenticateUserService';

const authenticationRouter = Router();

authenticationRouter.route('/sessions')
.post(async (request: Request, response: Response) => {
    try {
        const { email, password } = request.body;

        const authenticateUser = new AuthenticateUserService();

        const { user, token } = await authenticateUser.execute({
            email,
            password,
        });
        return response.json({ user, token });
    } catch (e) {
        return response.status(400).json({ error: e.message });
    }
});

export default authenticationRouter;
