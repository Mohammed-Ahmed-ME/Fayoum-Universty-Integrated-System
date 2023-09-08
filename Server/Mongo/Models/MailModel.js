import mongoose from "mongoose";
import {imageDefault, Roles, Statuses,category} from "../../API/Default.js";

const Mail_Schema = new mongoose.Schema({
    name: { type: String, required: true, immutable: true },
    email: { type: String, required: true, immutable: true },
    nationalID: { type: String, required: true, minLength:14, maxLength:14, immutable: true },
    faculty:{ type: String, required: true, immutable: true },
    academicYear:{ type: String, required: true, },
    category: { type: String, required: true, enum: category, },
    userRequest: { type: String, required: true, },
    img:{ type: String, default: imageDefault, },
    requestId: { type: String, unique: true },
    status:{ type: String, default: "Pending" , enum: Statuses },
    role:{ type:String,  required:true, immutable:true,  enum: Roles },
    sendTo:{ type:String, required:true,},
    response:{type:String , default:""},
    agreedBy:{type:String,default:""}


},{timestamps:true});

Mail_Schema.pre('save', function (next) {
    const currentDate = new Date();
    if (!this.requestId) {
        this.requestId = parseInt(currentDate.getTime().toString().substr(2) + Math.random().toString().substr(2, 3));
    }
    next();
});

const MailModel = mongoose.model('Mail', Mail_Schema);

export default MailModel;
