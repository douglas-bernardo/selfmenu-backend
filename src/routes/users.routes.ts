import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import CreateUserService from '../services/CreateUserService';
import ListUsersService from '../services/ListUsersService';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

const usersRouter = Router();
const upload = multer(uploadConfig);

interface User {
    email: string;
    password?: string;
    first_name: string;
    last_name: string;
}

usersRouter.get('/', ensureAuthenticated, async (request, response) => {
    const createUserService = new ListUsersService();
    const users = await createUserService.execute();
    return response.json(users);
});

usersRouter.post('/', async (request, response) => {
    const { email, password, first_name, last_name } = request.body;

    const createUserService = new CreateUserService();

    const user: User = await createUserService.execute({
        email,
        password,
        first_name,
        last_name,
    });

    delete user.password;

    return response.json(user);
});

usersRouter.patch(
    '/avatar',
    ensureAuthenticated,
    upload.single('avatar'),
    async (request, response) => {
        const updateUserAvatarService = new UpdateUserAvatarService();

        const user: User = await updateUserAvatarService.execute({
            user_id: request.user.id,
            avatarFileName: request.file?.filename ?? '',
        });

        delete user.password;
        return response.json(user);
    },
);

export default usersRouter;
