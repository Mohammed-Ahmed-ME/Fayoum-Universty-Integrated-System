
import UserModel from "../../Mongo/Models/UserModel.js";


export const PostManyNewUsers= (req, res) => {
    UserModel.insertMany(req.body).then(() => {
        console.log(req.body.length + " Users Added successfully")
        res.send(req.body.length + " Users Added successfully")
    }).catch((err) => {
        console.log(err.message)
        res.status(400).send(err.message)
    })

}

