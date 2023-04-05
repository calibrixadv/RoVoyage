import mongoose, { Schema,model } from "mongoose"
import isEmail from "validator/lib/isEmail";
import bcrypt from "bcrypt"

interface IUser{
    email:string,
    password:string,
}
const userSchema=new Schema<IUser>({
    email:{
        type:String,
        required:[true,'Please enter an email'],
        unique:true,
        lowercase:true,
        validate:[isEmail,'Please enter a valid email']
    },
    password:{
        type:String,
        required:[true,'Please enter a password'],
        minLength:[7,'Password too short!']
    },

});
userSchema.post('save',(doc,next)=>{
    console.log("User Created",doc)
    next();
})
userSchema.pre<IUser>('save',async (next)=>{
    next();
})
const User=model<IUser>('User',userSchema)
export default User;
