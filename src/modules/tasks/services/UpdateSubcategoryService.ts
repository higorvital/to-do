import { inject, injectable } from "tsyringe";
import AppError from "../../../shared/errors/AppError";
import ICategoriesRepository from "../repositories/ICategoriesRepository";
import ISubcategoriesRepository from "../repositories/ISubcategoriesRepository";

interface UpdateSubcategoryDTO{
    user_id: string;
    subcategory_id: string;
    name: string;
}

@injectable()
class UpdateSubcategoryService{

    constructor(
        @inject('CategoriesRepository')
        private categoriesRepository: ICategoriesRepository,
        @inject('SubcategoriesRepository')
        private subcategoriesRepository: ISubcategoriesRepository

    ){}

    public async execute({user_id, subcategory_id, name}: UpdateSubcategoryDTO){

        let subcategory = await this.subcategoriesRepository.findById(subcategory_id);

        if(!subcategory){
            throw new AppError('Essa subcategoria não existe');
        }

        const {category} = subcategory;

        if(!category){
            throw new AppError('Essa categoria não existe');
        }

        if(category.user_id !== user_id){
            throw new AppError('Essa categoria não não pertence a esse usuário');
        }


        const subcategoryExists = await this.subcategoriesRepository.findByNameAndCategory(name, category.id);

        if(subcategoryExists && subcategoryExists.id !== subcategory_id){
            throw new AppError('Você já tem uma subcategoria com esse nome');
        }

        subcategory.name = name;

        subcategory = await this.subcategoriesRepository.save(subcategory);

        return subcategory;

    }

}
export default UpdateSubcategoryService;