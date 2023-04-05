import { Response,Request } from "express"
import User from "../model/User";

import bcrypt from "bcrypt"




function signup_get(req:Request,res:Response){
    res.send("signup")
}
async function signup_post(req:Request,res:Response){
    const {email,password}=req.body;
    try{
        const salt=await bcrypt.genSalt();
        const user=new User({email:email,password:await bcrypt.hash(password,salt)})
        await user.save();
        res.status(201).json(user);
    }
    catch(err:any){
        console.log(err.message)
        res.status(400).json(err.message);
    }

}
function login_get(req:Request,res:Response){
    res.send("login")
}
async function login_post(req:Request,res:Response){
    res.send("user login")
}
export default {signup_get,signup_post,login_get,login_post};