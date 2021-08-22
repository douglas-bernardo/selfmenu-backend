import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '../models/User';
import AppError from '../errors/AppError';

interface Request {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
}
class CreateUserService {
    public async execute({
        email,
        first_name,
        last_name,
        password,
    }: Request): Promise<User> {
        const usersRepository = getRepository(User);

        const userExists = await usersRepository.findOne({
            where: { email },
        });

        if (userExists) {
            throw new AppError('Email already exists');
        }

        const hashedPassword = await hash(password, 8);

        const user = usersRepository.create({
            email,
            first_name,
            last_name,
            password: hashedPassword,
        });

        await usersRepository.save(user);

        return user;
    }
}

export default CreateUserService;
