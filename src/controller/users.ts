import express from 'express'
import { deleteUserById, getUserById, getUsers } from '../model/user'

export const getAllUsers = async (req: express.Request, res: express.Response): Promise<any> => {
    try{
        const users = await getUsers();
        return res.status(200).json(users);
    }catch(Error){
        console.log(Error);
        return res.sendStatus(400);
    }
}

export const deleteUser = async (req: express.Request, res: express.Response): Promise<any> => {
    try{
        const { id } = req.params;
        const deleted = await deleteUserById(id);
        return res.status(200).json(deleted);
    }catch(Error){
        console.log(Error);
        return res.sendStatus(400);
    }
}