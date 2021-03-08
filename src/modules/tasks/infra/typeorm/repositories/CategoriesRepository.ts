import { EntityRepository, getRepository, Repository } from "typeorm";
import ICreateCategory from "../../../dtos/ICreateCategory";
import ICategoriesRepository from "../../../repositories/ICategoriesRepository";
import Category from "../models/Category";

@EntityRepository(Category)
class CategoriesRepository implements ICategoriesRepository{

    private ormRepository: Repository<Category>;

    constructor(){
        this.ormRepository = getRepository(Category);
    }

    public async create(data: ICreateCategory){

        const category = this.ormRepository.create(data);

        await this.ormRepository.save(category);

        return category;
    }

    public async findById(id: string){
        const category = await this.ormRepository.findOne(id, {
            relations: ['subcategories']
        });

        return category;
    }

    public async findByUser(user_id: string){
        const categories = await this.ormRepository.find({
            where: {
                user_id
            },
            relations: ['subcategories']
        });

        return categories;
    }

    public async delete(id: string){
        await this.ormRepository.delete(id);
    }

    public async findByNameAndUser(name: string, user_id: string){
        const category = await this.ormRepository.findOne({
            where: {
                name,
                user_id
            },
            relations: ['subcategories']
        });

        return category;
    }

    public async save(category: Category){
        await this.ormRepository.save(category);

        return category;
    }

}

export default CategoriesRepository;