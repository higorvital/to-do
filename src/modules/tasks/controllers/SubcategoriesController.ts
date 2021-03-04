import {Request, Response} from 'express';
import { container } from 'tsyringe';
import * as Yup from 'yup';
import AppError from '../../../shared/errors/AppError';
import CreateCategoryService from '../services/CreateCategoryService';
import CreateSubcategoryService from '../services/CreateSubcategoryService';
import DeleteCategoryService from '../services/DeleteCategoryService';
import DeleteSubcategoryService from '../services/DeleteSubcategoryService';
import ListCategorySubcategoriesService from '../services/ListCategorySubcategories';
import UpdateCategoryService from '../services/UpdateCategoryService';
import UpdateSubcategoryService from '../services/UpdateSubcategoryService';

class SubcategoriesController{

    async index(request: Request, response: Response){
        
        const data = request.query;

        const schema = Yup.object({
            category: Yup.string().required()
        });

        try {
            await schema.validate(data, {
                abortEarly: false
            });
        } catch (error) {
            throw new AppError(error);
        }

        const {category} = data;

        const listCategorySubcategoriesService = container.resolve(ListCategorySubcategoriesService);

        const subcategories = await listCategorySubcategoriesService.execute(String(category), request.user.id);

        return response.status(200).json(subcategories);

    }

    async create(request: Request, response: Response){

        const data = request.body;

        const schema = Yup.object({
            name: Yup.string().required(),
            category_id: Yup.string().required()
        });

        try {
            await schema.validate(data, {
                abortEarly: false
            });
        } catch (error) {
            throw new AppError(error);
        }

        const {name, category_id} = data;

        const createSubcategoryService = container.resolve(CreateSubcategoryService);

        const subcategory = await createSubcategoryService.execute({
            user_id: request.user.id,
            category_id,
            name
        });

        return response.status(200).json(subcategory);
    }

    async delete(request: Request, response: Response){
        
        const {subcategory_id} = request.params;

        const deleteSubcategoryService = container.resolve(DeleteSubcategoryService);

        await deleteSubcategoryService.execute({
            user_id: request.user.id,
            subcategory_id
        });

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
        const {subcategory_id} = request.params;

        const updateSubcategoryService = container.resolve(UpdateSubcategoryService);

        const subcategory = await updateSubcategoryService.execute({
            user_id: request.user.id,
            name,
            subcategory_id
        });

        return response.status(200).json(subcategory);
    }
}

export default SubcategoriesController;