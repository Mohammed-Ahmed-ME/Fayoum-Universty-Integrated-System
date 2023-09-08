
import UserModel from "../../Mongo/Models/UserModel.js";

export const GetUser = (req, res) => {
    UserModel.findOne({nationalID: req.params.ID}).then((User) => {
        if (User !== null) {
            console.log(User.name +" was Found")
            res.send(User)
        } else {
            res.status(400).send("can't find any User Profile with this ID")
        }
    }).catch((err) => {
        console.log(err.message)
        res.status(400).send(err)
    })
}
