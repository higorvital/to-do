import ICreateUSerDTO from "../dtos/ICreateUserDTO";
import User from "../infra/typeorm/models/User";

interface IUsersRepository {

    findById(id: string): Promise<User | undefined>;
    findByEmail(email: string): Promise<User | undefined>;
    create(data: ICreateUSerDTO): Promise<User>
    save(user: User): Promise<User>

}

export default IUsersRepository;