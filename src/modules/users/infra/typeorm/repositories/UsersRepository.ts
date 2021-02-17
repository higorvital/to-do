import { EntityRepository, getRepository, Repository } from "typeorm";
import ICreateUSerDTO from "../../../dtos/ICreateUserDTO";
import IUsersRepository from "../../../repositories/IUsersRepository";
import User from "../models/User";

@EntityRepository(User)
class UsersRepository implements IUsersRepository{

    private ormRepository: Repository<User>;

    constructor(){
        this.ormRepository = getRepository(User);
    }

    public async findByEmail(email: string){

        const user = await this.ormRepository.findOne({
            where: {
                email
            }
        });

        return user;

    }

    public async findById(id: string){
        
        const user = await this.ormRepository.findOne(id);

        return user;

    }

    public async create({name, email, password}: ICreateUSerDTO){

        const user = this.ormRepository.create({
            name,
            email,
            password
        });

        await this.ormRepository.save(user);

        return user;

    }

    public async save(user: User){

        await this.ormRepository.save(user);

        return user;

    }

}

export default UsersRepository;