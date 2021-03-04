import { EntityRepository, getRepository, Repository } from "typeorm";
import ICreateSubcategory from "../../../dtos/ICreateSubcategory";
import ISubcategoriesRepository from "../../../repositories/ISubcategoriesRepository";
import Subcategory from "../models/Subcategory";

@EntityRepository(Subcategory)
class SubcategoriesRepository implements ISubcategoriesRepository{

    private ormRepository: Repository<Subcategory>;

    constructor(){
        this.ormRepository = getRepository(Subcategory);
    }

    public async create(data: ICreateSubcategory){

        const subcategory = this.ormRepository.create(data);

        await this.ormRepository.save(subcategory);

        return subcategory;
    }

    public async findById(id: string){
        const subcategory = await this.ormRepository.findOne(id);

        return subcategory;
    }

    public async findByCategory(category_id: string){
        const subcategories = await this.ormRepository.find({
            where: {
                category_id
            }
        });

        return subcategories;
    }

    public async delete(id: string){
        await this.ormRepository.delete(id);
    }

    public async findByNameAndCategory(name: string, category_id: string){
        const category = await this.ormRepository.findOne({
            where: {
                name,
                category_id
            }
        });

        return category;
    }

    public async save(subcategory: Subcategory){
        await this.ormRepository.save(subcategory);

        return subcategory;
    }

}

export default SubcategoriesRepository;