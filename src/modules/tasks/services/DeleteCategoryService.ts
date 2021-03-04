import { inject, injectable } from "tsyringe";
import AppError from "../../../shared/errors/AppError";
import ICreateCategory from "../dtos/ICreateCategory";
import ICategoriesRepository from "../repositories/ICategoriesRepository";

@injectable()
class DeleteCategoryService{

    constructor(
        @inject('CategoriesRepository')
        private categoriesRepository: ICategoriesRepository
    ){}

    public async execute(user_id: string,category_id: string){

        const category = await this.categoriesRepository.findById(category_id);

        if(!category){
            throw new AppError("Categoria não existe");
        }

        if(category.user_id !== user_id){
            throw new AppError("Essa categoria não pertence a esse usuário");
        }

        await this.categoriesRepository.delete(category_id);

    }

}
export default DeleteCategoryService;