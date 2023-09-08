import express from "express"
import multer from "multer";
import * as fs from "fs";
import {GetAllDetails} from "../API/Admin/Get Info.js";
import UserModel from "../Mongo/Models/UserModel.js";
import {PostNewUser} from "../API/Admin/Post User.js";
import {UpdateUser, UpdateUserPassword} from "../API/Users/Update_One.js";
import {DeleteUser} from "../API/Admin/Delete User.js";
import {GetFullAdministrators, GetAdministrators, GetAssistantProfessors, GetProfessors, GetResearchAssistants, GetStudents, GetTeachingAssistants} from "../API/Admin/Get By Role.js";
import {PostManyNewUsers} from "../API/Admin/Post Many Users.js";
import {CheckAuth, CheckHighAuth} from "../API/Middleware/Check Auth.js";
import {AddSubject, EditSubject, RemoveSubject} from "../API/Admin/Subjects Functions.js";
import {GetUser} from "../API/Admin/Get User.js";
const UserRouts = express.Router()

export const upload = multer({
    dest: "Images",
});


/////////////////////////////// Admin Routes //////////////////////////////



UserRouts.get('/Get/All/Users/Info',CheckHighAuth ,GetAllDetails)

UserRouts.get('/Get/Full/Administrators' ,CheckHighAuth, GetFullAdministrators )

UserRouts.get('/Get/Administrators' , CheckHighAuth, GetAdministrators )

UserRouts.get('/Get/Professors' , CheckHighAuth, GetProfessors )

UserRouts.get('/Get/Assistant/Professors' , CheckHighAuth, GetAssistantProfessors )

UserRouts.get('/Get/Teaching/Assistants' , CheckHighAuth, GetTeachingAssistants )

UserRouts.get('/Get/Research/Assistants' , CheckHighAuth, GetResearchAssistants)

UserRouts.get('/Get/Students' , CheckHighAuth, GetStudents )

UserRouts.post('/Post/New/User',CheckHighAuth, PostNewUser)

UserRouts.post('/Post/Many/New/Users', CheckHighAuth, PostManyNewUsers)

UserRouts.patch('/Update/User',CheckHighAuth,UpdateUser)

UserRouts.get('/Get/User/:ID',CheckHighAuth,GetUser)

UserRouts.patch('/Update/Me/Password',CheckAuth,UpdateUserPassword)

UserRouts.delete('/Delete/User/:ID', CheckHighAuth, DeleteUser)



UserRouts.post('/Add/Subject',CheckHighAuth, AddSubject);

UserRouts.post('/Remove/Subject',CheckHighAuth, RemoveSubject);


UserRouts.post('/Edit/Subject',CheckHighAuth, EditSubject);







UserRouts.patch('/Update/User/Img/:ID', upload.single("avatar"), async (req, res) => {
    const filePath = req.file.path;
    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Login reading file");
        }
        const bufferString = data.toString("base64");
        UserModel.findOneAndUpdate(
            { national_id: req.params.ID },
            { img: bufferString },
            { new: true, runValidators: true }
        )
    });
});





















export default  UserRouts





