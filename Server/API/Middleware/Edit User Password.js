import UserModel from "../../Mongo/Models/UserModel.js";

export const Edit_User_Password = (req, res) => {
    const ID = req.user.nationalID
    UserModel.findOneAndUpdate({nationalID: ID}, {password: req.body.password}).then(() => {
        res.send("You Update The Password Successfully!");
    }).catch((err) => {
        console.log(err.message);
        res.send(err.message);
    })
}
