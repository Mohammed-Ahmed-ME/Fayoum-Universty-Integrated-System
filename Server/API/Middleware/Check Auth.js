import jwt from "jsonwebtoken";
import UserModel from "../../Mongo/Models/UserModel.js";
import {SecretKey} from "../Default.js";
export const CheckHighAuth = async (req, res, next) => {
    try {
        const token = await req.header("Authorization")
        const decoded = await jwt.verify(token, SecretKey);
        if (decoded.role === "Full Administrator"){
            const User = await UserModel.findOne({nationalID: decoded.nationalID, 'loginTokens.token': token})
            if (User) {
                req.user = User
                next()
            } else {
                throw new Error
            }
        }
        else {
            throw new Error
        }
    } catch (err) {
        console.log( err)
        res.status(401).send("Not Authorized")
    }
}
export const CheckAuth = async (req, res, next) => {
    try {
        const token = await req.header("Authorization")
        const decoded = await jwt.verify(token, SecretKey);
        const User = await UserModel.findOne({nationalID: decoded.nationalID, 'loginTokens.token': token})
        if (User) {
            req.user = User
            next()

        } else {
            throw new Error
        }
    } catch (err) {
        console.log("Not Authorized" + err)
        res.status(401).send("Not Authorized")
    }
}
