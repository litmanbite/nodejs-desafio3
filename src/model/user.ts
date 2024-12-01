import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    userName : { type : String, required : true },
    email : { type : String, required : true },
    authentic : {
        password : { type : String, required : true, select : false }, // aparentemente o select ja funciona como um dto, impedindo que no get venha o atributo ou algo do genero 
        salt: { type : String, select : true },
        sessionToken : {type : String, select : false }
    },
});

export const UserModel = mongoose.model('User',UserSchema);

export const getUsers = () => UserModel.find();
export const getUserByEmail = (email : String) => UserModel.findOne({email});
export const getUserByToken = (sessionToken : String) => UserModel.findOne({
    'auth.sessionToken' : sessionToken,
});
export const getUserById = (id : String) => UserModel.findById(id);
export const createUser = (values: Record<string, any>) => new UserModel(values).save().then((user) => user.toObject());
export const deleteUserById = (id: string) => UserModel.deleteOne({ _id: id });
export const updateUserById = (id:string, values: Record<string, any>) => UserModel.findByIdAndUpdate(id, values);
