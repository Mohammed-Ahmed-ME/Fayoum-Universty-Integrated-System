import UserModel from "../../Mongo/Models/UserModel.js";
import bcrypt from "bcryptjs";
import pkg from 'validator';
const { isStrongPassword } = pkg;
export const UpdateUser = async (req, res) => {
    await UserModel.findOneAndUpdate({nationalID: req.body.nationalID}, req.body,{new:true,runValidators:true}).then(async (User)=>{
       if(User === null){
            res.status(404).send("User Profile not found")
        }
        else {
            const whoUpdate = "Name: " + req.user.name +" ID: " +  req.user.nationalID
           console.log(User.name + " updated successfully")
           User.updateBy.push({whoUpdate})
             console.log(User.updateBy)
           User.save()
           res.status(200).send(User.name + " updated successfully")
        }
    }).catch((err)=>{
        res.status(500).send(err.message)
        console.log(err)
    })
}


export const UpdateUserPassword = async(req , res) => {
    const Data = await UserModel.findOne({nationalID: req.user.nationalID})
    const isMatch = await bcrypt.compare( req.body.Old , Data.password);
    if (isMatch)
    {
        if (!isStrongPassword(req.body.New)) {
            return res.send("Please enter a strong password containing numbers, uppercase letters, lowercase letters, and special characters");
        }
        await UserModel.findOneAndUpdate({nationalID: req.user.nationalID} , {password: req.body.New})
        res.send("Success")
    }


    else {
        res.send("Old password does not match")
    }

}