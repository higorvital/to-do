import { inject, injectable } from "tsyringe";
import AppError from "../../../shared/errors/AppError";
import IHashProvider from "../providers/HashProvider/IHashProvider";
import IUsersRepository from "../repositories/IUsersRepository";

interface IUpdateUserDTO{
    user_id: string;
    name: string;
    email: string;
    password?: string;
    old_password?: string;
    password_confirmation?: string;
}

@injectable()
class UpdateUserService {

    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
        @inject('HashProvider')
        private hashProvider: IHashProvider

    ){}

    public async execute({user_id, name, email, password, old_password}: IUpdateUserDTO){

        const user = await this.usersRepository.findById(user_id);

        if(!user){
            throw new AppError("Usuário não encontrado");
        }

        const userWithEmail = await this.usersRepository.findByEmail(email);

        if(userWithEmail && email !== user.email){
            throw new AppError("E-mail já está cadastrado");
        }

        user.email = email;
        user.name = name;

        if(password && old_password){

            const passwordCorrect = await this.hashProvider.compareHash(old_password, user.password);

            if(!passwordCorrect){
                throw new AppError("Senha antiga incorreta");
            }

            user.password = await this.hashProvider.generateHash(password);

        }

        await this.usersRepository.save(user);

        return user;

    }

}

export default UpdateUserService;