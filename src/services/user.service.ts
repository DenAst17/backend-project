import { AppDataSource } from "../../ormconfig";
import { User } from "../entities/user.entity";

class UserService {
    userRepository = AppDataSource.getRepository(User);
    async getAll() {
        const allUsers = await this.userRepository.find();
        return allUsers;
    }
    async getOne(userID: number) {
        const foundUser = await this.userRepository.findOneBy({
            id: userID
        })
        return foundUser;
    }
    async create(user: User) {
        await AppDataSource.manager.save(user)
        return user;
    }
    async delete(userID: number) {
        const userToRemove = await this.getOne(userID);
        if (userToRemove) {
            await this.userRepository.remove(userToRemove);
            return userToRemove;
        }
        return null;
    }
    updateInfo(userToUpdate: User, user: User) {
        userToUpdate.name = user.name;
        userToUpdate.surname = user.surname;
        userToUpdate.email = user.email;
    }
    async update(userID: number, user: User) {
        let userToUpdate = await this.getOne(userID);
        if (userToUpdate) {
            this.updateInfo(userToUpdate, user);
            await this.userRepository.save(userToUpdate)
            return userToUpdate.id;
        }
        return null;
    }
}

export default UserService;
