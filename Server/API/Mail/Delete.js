

import MailModel from "../../Mongo/Models/MailModel.js";

export const DeleteMail = (req, res) => {
    console.log("DeleteMail")
    MailModel.findOne({requestId: req.params.ID}).then((request) => {
        if (request !== null) {
            MailModel.deleteOne({requestId:req.params.ID}).then(() => {
               console.log(request.name + " Request deleted")
                res.send(request.name + " Request deleted");
            }).catch((error) => {
                console.log(error.message)
            })        } else {
            res.status(400).send("can't find any request with this ID")
        }
    }).catch((err) => {
        console.log(err.message)
    })
}