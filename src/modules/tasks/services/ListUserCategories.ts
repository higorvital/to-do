import { inject, injectable } from "tsyringe";
import ICategoriesRepository from "../repositories/ICategoriesRepository";

@injectable()
class ListUserCategoriesService{

    constructor(
        @inject('CategoriesRepository')
        private categoriesRepository: ICategoriesRepository
    ){}

    public async execute(user_id: string){

        const categories = await this.categoriesRepository.findByUser(user_id);

        return categories;

    }

}
export default ListUserCategoriesService;