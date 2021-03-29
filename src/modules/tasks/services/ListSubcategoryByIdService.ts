import { inject, injectable } from "tsyringe";
import AppError from "../../../shared/errors/AppError";
import ICategoriesRepository from "../repositories/ICategoriesRepository";
import ISubcategoriesRepository from "../repositories/ISubcategoriesRepository";

@injectable()
class ListSubcategoryByIdService{

    constructor(
        @inject('SubcategoriesRepository')
        private subcategoriesRepository: ISubcategoriesRepository,
        @inject('CategoriesRepository')
        private categoriesRepository: ICategoriesRepository
    ){}

    public async execute(subcategory_id: string, user_id: string){

        const subcategory = await this.subcategoriesRepository.findById(subcategory_id);

        if(!subcategory){
            throw new AppError("Subcategoria não encontrada");
        }

        const category = await this.categoriesRepository.findById(subcategory?.category_id);

        if(!category){
            throw new AppError("Categoria não encontrada");
        }

        if(category.user_id !== user_id){
            throw new AppError("Essa categoria não pertence a esse usuário");
        }

        return subcategory;

    }

}
export default ListSubcategoryByIdService;