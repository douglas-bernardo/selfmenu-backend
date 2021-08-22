import { getRepository } from 'typeorm';
import User from '../models/User';

class ListUsersService {
    public async execute(): Promise<User[]> {
        const usersRepository = getRepository(User);
        return usersRepository.find();
    }
}

export default ListUsersService;
