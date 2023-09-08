
import UserModel from "../../Mongo/Models/UserModel.js";

export const PostNewUser = (req, res) => {
    const { name, role } = req.body;
    const addBy = req.user.name + " " + req.user.nationalID;

    const newUser = new UserModel({ ...req.body, addBy });

    newUser.save()
        .then(() => {
            res.send(`${name} added successfully as ${role}`);
        })
        .catch((err) => {
            console.log(err.message);
            res.status(400).send(err.message);
        });
};
