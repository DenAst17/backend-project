import { AppDataSource } from "../data-source";
import {User} from "../entities/user.entity";

class UserService {
    UserRepository = AppDataSource.getRepository(User);
    async getAll() {
        const allUsers = await this.UserRepository.find();
        return allUsers;
    }
    async getOne(userID:number) {
        const foundUser = await this.UserRepository.findOneBy({
            id: userID
        })
        return foundUser;   
    }
}

export default UserService;
