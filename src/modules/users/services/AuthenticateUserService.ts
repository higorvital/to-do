import { inject, injectable } from "tsyringe";
import AppError from "../../../shared/errors/AppError";
import IHashProvider from "../providers/HashProvider/IHashProvider";
import IUsersRepository from "../repositories/IUsersRepository";
import authConfig from '../../../config/auth';
import {sign} from 'jsonwebtoken';

@injectable()
class AuthenticateUserService {

    constructor(
        @inject('UsersRepository')
        private userRepository: IUsersRepository,
        @inject('HashProvider')
        private hashRepository: IHashProvider
    ){}

    public async execute(email: string, password: string){
        
        const user = await this.userRepository.findByEmail(email);

        if(!user){
            throw new AppError("E-mail não cadastrado");
        }

        if(!(await this.hashRepository.compareHash(password, user.password))){
            throw new AppError("Senha incorreta");
        }

        const {secret, expiresIn} = authConfig;

        const token = sign({}, secret, {
            subject: user.id,
            expiresIn
        });

        return {
            user,
            token
        }

    }

}

export default AuthenticateUserService;