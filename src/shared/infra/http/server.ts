import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';

import cors from 'cors';

import '../typeorm';
import '../../container';
import routes from './routes';
import AppError from '../../errors/AppError';

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);

app.use((err: Error, request: Request, response: Response, next: NextFunction)=>{
    if(err instanceof AppError){
        return response.status(err.status).json({
            status: "error",
            message: err.message
        })
    }else{
        return response.status(500).json({
            status: "error",
            message: err.message
        })
    }
})

app.listen(3333, ()=>{
    console.log('Servidor iniciado com sucesso!');
});