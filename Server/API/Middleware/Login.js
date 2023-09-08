import UserModel from "../../Mongo/Models/UserModel.js";
import bcrypt from "bcryptjs";

export const Check_User_Exist = async (req, res) =>{
    try{
        const {email, password} = req.body;
        const User = await UserModel.findOne({email});
        if(!User){
            return res.status(401).send( "Invalid Email or Password !!");
        }
        const isMatch = await bcrypt.compare(password, User.password);
        if(!isMatch) {
            return res.status(401).send("Invalid Email or Password !!");
        }
        const token = await User.generateLoginToken()
        res.status(200).send({User , token});
    }catch(err){
        res.status(401).json({message: err.message});
    }
}