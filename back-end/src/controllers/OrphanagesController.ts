import {Request, response, Response} from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';

import orphanage_view from '../views/orphanages_view'
import Orphanage from '../models/Orphanage';
import orphanages_view from '../views/orphanages_view';

export default {
    async show(request:Request, response:Response){
        const {id} = request.params;

        const orphanagesRepository = getRepository(Orphanage);

        const orphanage = await orphanagesRepository.findOneOrFail(id, {
            relations: ['images']
        });
        
        return response.json(orphanage_view.render(orphanage));
    },
    
    async index(request:Request, response:Response){
        const orphanagesRepository = getRepository(Orphanage);

        const orphanages = await orphanagesRepository.find({
            relations: ['images']
        });
        
        return response.json(orphanages_view.renderMany(orphanages));
    },

    async create(request:Request, response:Response){
        const {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends
        } = request.body;
        const orphanagesRepository = getRepository(Orphanage);

        const requestImages = request.files as Express.Multer.File[];
        
        const images = requestImages.map(image => {
            return  {path: image.filename}
        })

        const data = {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends: open_on_weekends === 'true',
            images
        };

        const squema = Yup.object().shape({
            name: Yup.string().required(),
            latitude: Yup.number().required(),
            longitude: Yup.number().required(),
            about: Yup.string().required().max(300),
            instructions: Yup.string().required(),
            opening_hours: Yup.string().required(),
            open_on_weekends: Yup.boolean().required(),
            images: Yup.array(
                Yup.object().shape({
                    path: Yup.string().required(),
                }))
        });

        await squema.validate(data, {
            abortEarly: false
        });

        const orphanage = orphanagesRepository.create(data);

        await orphanagesRepository.save(orphanage);

        return response.status(201).json(orphanage);
    }
}