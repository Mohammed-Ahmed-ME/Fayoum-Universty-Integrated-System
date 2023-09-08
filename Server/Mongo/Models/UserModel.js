import mongoose from "mongoose";
import check from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {Roles, Facultys, imageDefault, Years, SecretKey} from "../../API/Default.js";
const UserModelSchema = new mongoose.Schema({
    nationalID: {
        type: String, required: true, unique: true, minLength: 14, maxLength: 14, immutable: true // once set, national_id cannot be changed
    },
    nationality: {
        type: String, required: true, trim: true, immutable: true
    },
    name: {
        type: String, required: true, minLength: 3, trim: true
    },
    email: {
        type: String, required: true, trim: true, lowercase: true, unique: true, immutable: true, // once set, email cannot be changed
        validate(value) {
            if (!check.isEmail(value) || !value.endsWith("@fayoum.edu.eg")) {
                throw new Error("Please enter a valid email and Must End With '@fayoum.edu.eg'" )
            }

        }
    },
    password: {
        type: String, required: true, minLength: 8,
        validate(value) {
            if (!check.isStrongPassword(value)) {
                throw new Error("Please enter a strong password containing numbers, uppercase letters, lowercase letters, and special characters")
            }
        }
    },
    age: {
        type: String, required: true, trim: true,
        validate(value) {
            if (Number(value) <= 18) {
                throw new Error("Age Cannot Be Les Than 18")
            }
        }
    },
    gender: {
        type: String, required: true, trim: true, immutable: true // once set, gender cannot be changed
    },
    address: {
        type: String, required: true, trim: true
    },
    phone: {
        type: String, required: true, trim: true, unique: true
    },
    faculty: {
        type: String, required: true, trim: true , enum: Facultys
    },
    loginTokens: [
        {
            token: {
                type: String,
                required: true
            },
            loginDate: {type: Date, required: true, default: Date.now
            },
            endDate: {type: Date, required: true,
                default: function () {
                    return new Date(Date.now() + 24 * 60 * 60 * 1000);}
            }
        }
    ],
    subjects:[
        {
            subjectName:{type:String},
            subjectCode: { type: String},
            addDate: {type: Date, required: true, default: Date.now, immutable:true},
            addBy: {type: String},
            degree: {type: String, default: "Pending"},
            updatedBy: [
                {
                    whoUpdate: {type: String },
                    data: {type:Date , default: Date.now,immutable:true},
                    degree: {type: String}
                }
            ],
        }
    ],
    academicYear: {
        type: String, default: "None", trim: true, enum: Years },
    img:{
        type: String, required:true ,default:imageDefault },
    role:{
        type:String,
        time:true,
        required:true,
        immutable:true,
        enum: Roles
    },
    addBy:{type:String},
    updateBy:[

                {
                    whoUpdate: {type: String },
                    data: {type:Date , default: Date.now,immutable:true},
                }
    ]

},{timestamps:true });

UserModelSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});
UserModelSchema.pre('insertMany', async function (next, docs) {
    for (let i = 0; i < docs.length; i++) {
        const salt = await bcrypt.genSalt(10);
        docs[i].password = await bcrypt.hash(docs[i].password, salt);
    }
    next();
});
UserModelSchema.pre('findOneAndUpdate', async function (next) {
    const password = this.getUpdate().password;
    if (password) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        this.set({password: hashedPassword});
    }
    next();
});
UserModelSchema.methods.generateLoginToken = async function () {
    const token = jwt.sign({email: this.email.toString(),
        nationalID: this.nationalID.toString() ,
        role: this.role.toString() ,
         },  SecretKey);
    this.loginTokens = this.loginTokens.concat({token});
    this.save();
    return token;
};

UserModelSchema.methods.toJSON = function () {
    const user = this.toObject()
    delete user.password;
    return user;
}

const UserModel = new mongoose.model('Users', UserModelSchema);
export default UserModel;
