import express from 'express'
import { get, identity, merge } from 'lodash'
import { getUserByToken } from '../model/user'

export const isOwner = async (req : express.Request, res : express.Response, next: express.NextFunction): Promise<any> => {
    try{
        const { id } = req.params;
        const curr = get(req, 'identity._id')as String;

        if(!curr || curr.toString() != id)
            return res.sendStatus(403);

        next();
    }catch(Error){
        console.log(Error);
        return res.sendStatus(400);
    }
}
export const isAuth = async (req : express.Request, res : express.Response, next: express.NextFunction): Promise<any> => {
    try{
        const sessionToken = req.cookies['litauth'];

        if(!sessionToken)
            return res.sendStatus(403);

        const existUser = await getUserByToken(sessionToken);

        if(!existUser)
            return res.sendStatus(403);

        merge(req, { identity, existUser});

        return next();
    }catch(Error){
        console.log(Error);
        return res.sendStatus(400);
    }
}