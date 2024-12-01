import express from 'express'
import { deleteUser, getAllUsers } from '../controller/users'
import { isAuth } from '../middlewear/index';
import { isOwner } from '../middlewear/index';

export default(router : express.Router) => {
    router.get('/users',isAuth, getAllUsers);
    router.delete('/users/:id',isOwner, deleteUser);
};
