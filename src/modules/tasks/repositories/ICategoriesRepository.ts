import ICreateCategory from "../dtos/ICreateCategory";
import Category from "../infra/typeorm/models/Category";

interface ICategoriesRepository{

    create(data: ICreateCategory): Promise<Category>;
    findByUser(user_id: string): Promise<Category[]>;
    findById(id: string): Promise<Category | undefined>;
    findByNameAndUser(name: string, user_id: string): Promise<Category | undefined>;
    delete(id: string): Promise<void>;
    save(category: Category): Promise<Category>;
}

export default ICategoriesRepository;