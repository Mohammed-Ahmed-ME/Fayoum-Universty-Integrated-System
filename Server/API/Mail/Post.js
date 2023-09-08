
import MailModel from "../../Mongo/Models/MailModel.js";
import UserModel from "../../Mongo/Models/UserModel.js";

export const NewMail = async (req, res) => {
            const nationalID = req.user.nationalID
            const name = req.user.name
            const email = req.user.email
            const img = req.user.img
            const faculty = req.user.faculty
            const academicYear = req.user.academicYear
            const role = req.user.role
            const userRequest = req.body.userRequest
            const sendTo = req.body.sendTo
            const category = req.body.category
            const Data = {nationalID , role, userRequest, sendTo, academicYear,faculty,email,img,name,category}
            const User = await UserModel.findOne({email: sendTo})
            if (User) {
                const newRequest = new MailModel(Data)
                newRequest.save().then(() => {
                    console.log("Request Add By " +  name );
                    res.send("Request Send Successfully")
                }).catch((err) => {
                    console.log(err.message)
                    res.status(400).send(err.message)
                })

            } else {
                 res.send("User Not Found")
            }

}