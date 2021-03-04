import { inject, injectable } from "tsyringe";
import AppError from "../../../shared/errors/AppError";
import ICategoriesRepository from "../repositories/ICategoriesRepository";
import ISubcategoriesRepository from "../repositories/ISubcategoriesRepository";

interface CreateSubcategoryDTO{
    user_id: string;
    category_id: string;
    name: string;
}

@injectable()
class CreateSubcategoryService{

    constructor(
        @inject('CategoriesRepository')
        private categoriesRepository: ICategoriesRepository,
        @inject('SubcategoriesRepository')
        private subcategoriesRepository: ISubcategoriesRepository
    ){}

    public async execute({user_id, category_id, name}: CreateSubcategoryDTO){

        const category = await this.categoriesRepository.findById(category_id);

        if(!category){
            throw new AppError('Essa categoria não existe');
        }

        if(category.user_id !== user_id){
            throw new AppError('Essa categoria não não pertence a esse usuário');
        }

        const subcategoryExists = await this.subcategoriesRepository.findByNameAndCategory(name, category_id);

        if(subcategoryExists){
            throw new AppError('Você já tem uma subcategoria com esse nome');
        }

        const subcategory = await this.subcategoriesRepository.create({category_id, name});

        return subcategory;

    }

}
export default CreateSubcategoryService;