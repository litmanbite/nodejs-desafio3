import express, { Request, Response } from 'express'; 
import { login, register } from '../controller/controller';  

const router = express.Router();


export default (router: express.Router) => {
    router.post('/register' ,register);
    router.post('/login' ,login);
}
