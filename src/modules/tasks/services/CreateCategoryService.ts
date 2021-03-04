import { inject, injectable } from "tsyringe";
import AppError from "../../../shared/errors/AppError";
import ICreateCategory from "../dtos/ICreateCategory";
import ICategoriesRepository from "../repositories/ICategoriesRepository";

@injectable()
class CreateCategoryService{

    constructor(
        @inject('CategoriesRepository')
        private categoriesRepository: ICategoriesRepository
    ){}

    public async execute({user_id, name}: ICreateCategory){

        const categoryExists = await this.categoriesRepository.findByNameAndUser(name, user_id);

        if(categoryExists){
            throw new AppError('Você já tem uma categoria com esse nome');
        }

        const category = await this.categoriesRepository.create({user_id, name});

        return category;

    }

}
export default CreateCategoryService;