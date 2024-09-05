import { Repository } from "typeorm";
import { Users } from "../db/entities/users";
import { DatabaseInitialization } from "../db/orm-config";

class UserService {
  async findByUserAuthId(id: string): Promise<Users | null> {
    const connection = await DatabaseInitialization.dbCreateConnection();
    const userRepository: any = connection?.getRepository(Users);
    const response = await userRepository.findOne({
      where: {
        user_auth_id: id,
      },
    });
    return response;
  }

  async findByUserId(id: string): Promise<Users | null> {
    const connection = await DatabaseInitialization.dbCreateConnection();
    const userRepository: any = connection?.getRepository(Users);
    const response = await userRepository.findOne({
      where: {
        id,
      },
    });
    return response;
  }

  async create(user: Users): Promise<Users> {
    const connection = await DatabaseInitialization.dbCreateConnection();
    const userRepository: any = connection?.getRepository(Users);
    return userRepository.save(user);
  }

  async update(id: string, user_data: Users) {
    const connection = await DatabaseInitialization.dbCreateConnection();
    const userRepository: any = connection?.getRepository(Users);
    await userRepository.update({ id }, user_data);
  }

  async countFreeUsers() {
    const connection = await DatabaseInitialization.dbCreateConnection();
    const userRepository: any = connection?.getRepository(Users);
    return await userRepository.count({ where: { user_type: "free" } });
  }
}

let userService: UserService = new UserService();
export default userService;
