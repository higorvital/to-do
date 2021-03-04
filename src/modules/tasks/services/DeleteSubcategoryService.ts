import { inject, injectable } from "tsyringe";
import AppError from "../../../shared/errors/AppError";
import ICategoriesRepository from "../repositories/ICategoriesRepository";
import ISubcategoriesRepository from "../repositories/ISubcategoriesRepository";

interface DeleteSubcategoryDTO{
    user_id: string;
    subcategory_id: string;
}

@injectable()
class DeleteSubcategoryService{

    constructor(
        @inject('CategoriesRepository')
        private categoriesRepository: ICategoriesRepository,
        @inject('SubcategoriesRepository')
        private subcategoriesRepository: ISubcategoriesRepository
    ){}

    public async execute({user_id, subcategory_id}: DeleteSubcategoryDTO){

        const subcategory = await this.subcategoriesRepository.findById(subcategory_id);

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


        await this.subcategoriesRepository.delete(subcategory_id);

    }

}
export default DeleteSubcategoryService;