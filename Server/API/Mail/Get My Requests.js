
import  MailModel from "../../Mongo/Models/MailModel.js";

export const MailInbox = (req, res) => {
     MailModel.find({sendTo: req.user.email}).then((request) => {
        if (request.length !== 0) {
            console.log(request.length + " Request Found ");
            res.send(request)
        } else {
            console.log(" 0 Found ");
            res.send([])
        }
    }).catch((err) => {
        console.log(err.message)
    })
}
export const MailOutbox = (req, res) => {
     MailModel.find({email: req.user.email }).then((request) => {
        if (request.length !== 0) {
            console.log(request.length + " Request Found");
            res.send(request)
        } else {
            console.log(" 0 Found ");

            res.send([])
        }
    }).catch((err) => {
        console.log(err.message)
    })
}

