import ICreateSubcategory from "../dtos/ICreateSubcategory";
import Subcategory from "../infra/typeorm/models/Subcategory";

interface ISubcategoriesRepository{

    create(data: ICreateSubcategory): Promise<Subcategory>;
    findByCategory(category_id: string): Promise<Subcategory[]>;
    findById(id: string): Promise<Subcategory | undefined>;
    findByNameAndCategory(name: string, category_id: string): Promise<Subcategory | undefined>;
    delete(id: string): Promise<void>;
    save(subcategory: Subcategory): Promise<Subcategory>;
}

export default ISubcategoriesRepository;