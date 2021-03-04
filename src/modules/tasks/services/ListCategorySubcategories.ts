import { inject, injectable } from "tsyringe";
import AppError from "../../../shared/errors/AppError";
import ICategoriesRepository from "../repositories/ICategoriesRepository";
import ISubcategoriesRepository from "../repositories/ISubcategoriesRepository";

@injectable()
class ListCategorySubcategoriesService{

    constructor(
        @inject('CategoriesRepository')
        private categoriesRepository: ICategoriesRepository,
        @inject('SubcategoriesRepository')
        private subcategoriesRepository: ISubcategoriesRepository
    ){}

    public async execute(category_name: string, user_id: string){

        const category = await this.categoriesRepository.findByNameAndUser(category_name, user_id)

        if(!category){
            throw new AppError("Você não tem um categoria com esse nome");
        }

        const subcategories = await this.subcategoriesRepository.findByCategory(category.id);

        return subcategories;

    }

}
export default ListCategorySubcategoriesService;