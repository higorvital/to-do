import { inject, injectable } from "tsyringe";
import AppError from "../../../shared/errors/AppError";
import ICategoriesRepository from "../repositories/ICategoriesRepository";

interface UpdateCategoryDTO{
    user_id: string;
    category_id: string;
    name: string;
}

@injectable()
class UpdateCategoryService{

    constructor(
        @inject('CategoriesRepository')
        private categoriesRepository: ICategoriesRepository
    ){}

    public async execute({user_id, category_id, name}: UpdateCategoryDTO){

        let categoryExists = await this.categoriesRepository.findByNameAndUser(name, user_id);

        if(categoryExists && categoryExists.id !== category_id){
            throw new AppError('Você já tem uma categoria com esse nome');
        }

        let category = await this.categoriesRepository.findById(category_id);

        if(!category){
            throw new AppError('Categoria não existe');
        }

        category.name = name;

        category = await this.categoriesRepository.save(category);

        return category;

    }

}
export default UpdateCategoryService;