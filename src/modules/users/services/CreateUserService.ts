import AppError from "../../../shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import ICreateUSerDTO from "../dtos/ICreateUserDTO";
import IUsersRepository from "../repositories/IUsersRepository";
import User from "../infra/typeorm/models/User";
import IHashProvider from "../providers/HashProvider/IHashProvider";

@injectable()
class CreateUserService{

    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
        @inject('HashProvider')
        private hashProvider: IHashProvider
    ){}

    public async execute({name, email, password}: ICreateUSerDTO): Promise<User>{

        const userExists = await this.usersRepository.findByEmail(email);

        if(userExists){
            throw new AppError("E-mail já cadastrado");
        }

        const hashedPassword = await this.hashProvider.generateHash(password);

        const user = await this.usersRepository.create({name, email, password: hashedPassword});

        return user;

    }

}

export default CreateUserService;