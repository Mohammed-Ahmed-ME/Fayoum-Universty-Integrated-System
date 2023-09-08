import mongoose from "mongoose";
import {imageDefault, Roles, Years} from "../../API/Default.js";

const News_Schema = new mongoose.Schema({
    name: {
        type: String, required: true, immutable: true
    },
    email: {
        type: String, required: true, immutable: true
    },
    faculty:{
        type: String, required: true, immutable: true
    },
    userNews: {
        type: String, required: true
    },
    img:{
        type: String, default: imageDefault,
            },
    requestId: { type: String, unique: true },
    role:{
        type:String,
        required:true,
        immutable:true,
        enum: Roles,
    },
    sendTo:{
        type:String,
        required:true,
        enum: Roles,
    },
    studentGroup : {
        type:String,
        enum: Years
    }
},{timestamps:true});

News_Schema.pre('save', function (next) {
    const currentDate = new Date();
    if (!this.requestId) {
        this.requestId = parseInt(currentDate.getTime().toString().substr(2) + Math.random().toString().substr(2, 3));
    }
    next();
});

const NewsModel = mongoose.model('News', News_Schema);

export default NewsModel;
