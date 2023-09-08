
import UserModel from "../../Mongo/Models/UserModel.js";
import MailModel from "../../Mongo/Models/MailModel.js";
export const DeleteUser = (req, res) => {
                UserModel.deleteOne({nationalID:req.params.ID}).then((User) => {
                res.send("Urer Deleted successfully");
                MailModel.deleteMany({nationalID:req.params.ID}).then(() => {
                    });
        }).catch((error) => {
                res.status(404).send(error.message)
        })

}
