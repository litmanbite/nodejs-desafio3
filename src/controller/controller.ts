import express from 'express'
import { createUser, getUserByEmail } from '../model/user'; // Adjust the path if necessary
import { auth, random } from '../helpers/index'

export const login = async (req : express.Request, res:express.Response) : Promise<any> => {
    try{
        const{email, password} = req.body;

        if (!email || !password)
            return res.sendStatus(400);

        const user = await getUserByEmail(email)
                            .select('+authentic.salt +authentic.password');

        if (!user)
            return res.sendStatus(400);

        const hash = auth(user.authentic.salt, password);

        if (user.authentic.password != hash)
            return res.sendStatus(403);

        const salt = random();
        user.authentic.sessionToken = auth(salt,user._id.toString());
        await user.save();
        res.cookie('litauth',user.authentic.sessionToken,{domain:'localhost',path:'/'});
        return res.sendStatus(200);
    }catch(error){
        console.log(error);
        return res.sendStatus(400);
    }
}

export const register =  async (req : express.Request, res:express.Response) : Promise<any> => {
    try {
        const { email, password, userName } = req.body;

        if (!email || !password || !userName)
            return res.sendStatus(400);

        const exist = await getUserByEmail(email);

        if (exist)
            return res.sendStatus(400);

        const salt  = random();
        const user = await createUser({
            email,
            userName,
            authentic : {
                salt,
                password : auth(salt, password),
            },
        });

        return res.status(200).json(user).end();
    } catch (Error){
        console.log('erro');
        return res.sendStatus(400);
    }
}