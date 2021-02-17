import { NextFunction, Request, Response } from "express";
import AppError from "../../../errors/AppError";
import {verify} from 'jsonwebtoken';
import authConfig from "../../../../config/auth";

interface TokenPayload {
    iat: number,
    exp: number,
    sub: string
}

export default (request: Request, response: Response, next: NextFunction) => {
    const authHeader = request.headers.authorization

    if(!authHeader){
        throw new AppError("Token não enviado");
    }

    const [,token] = authHeader.split(' ');

    try {

        const decoded = verify(token, authConfig.secret);

        const {sub} = decoded as TokenPayload;

        request.user = {
            id: sub
        }

        return next();
        
    } catch (error) {
        throw new AppError("Token inválido");

    }


}