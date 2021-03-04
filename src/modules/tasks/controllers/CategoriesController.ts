import {Request, Response} from 'express';
import { container } from 'tsyringe';
import * as Yup from 'yup';
import AppError from '../../../shared/errors/AppError';
import CreateCategoryService from '../services/CreateCategoryService';
import DeleteCategoryService from '../services/DeleteCategoryService';
import ListUserCategoriesService from '../services/ListUserCategories';
import UpdateCategoryService from '../services/UpdateCategoryService';

class CategoriesController{

    async index(request: Request, response: Response){
        
        const listUserCategoriesService = container.resolve(ListUserCategoriesService);

        const categories = await listUserCategoriesService.execute(request.user.id);

        return response.status(200).json(categories);

    }

    async create(request: Request, response: Response){

        const data = request.body;

        const schema = Yup.object({
            name: Yup.string().required()
        });

        try {
            await schema.validate(data, {
                abortEarly: false
            });
        } catch (error) {
            throw new AppError(error);
        }

        const {name} = data;

        const createCategoryService = container.resolve(CreateCategoryService);

        const category = await createCategoryService.execute({
            user_id: request.user.id,
            name
        });

        return response.status(200).json(category);
    }

    async delete(request: Request, response: Response){
        
        const {category_id} = request.params;

        const deleteCategoryService = container.resolve(DeleteCategoryService);

        await deleteCategoryService.execute(request.user.id, category_id);

        return response.status(200).send();

    }

    async update(request: Request, response: Response){

        const data = request.body;

        const schema = Yup.object({
            name: Yup.string().required()
        });

        try {
            await schema.validate(data, {
                abortEarly: false
            });
        } catch (error) {
            throw new AppError(error);
        }

        const {name} = data;
        const {category_id} = request.params;

        const createCategoryService = container.resolve(UpdateCategoryService);

        const category = await createCategoryService.execute({
            user_id: request.user.id,
            name,
            category_id
        });

        return response.status(200).json(category);
    }
}

export default CategoriesController;