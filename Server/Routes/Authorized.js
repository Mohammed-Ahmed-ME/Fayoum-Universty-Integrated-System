import express from "express";
import {Get_Me_User} from "../API/Middleware/Get Loged User.js";
import {CheckAuth} from "../API/Middleware/Check Auth.js";
import {Edit_User_Password} from "../API/Middleware/Edit User Password.js";


const Auth_Login = express.Router()


Auth_Login.post('/Login/User/Me', CheckAuth, Get_Me_User)



Auth_Login.patch('/Login/User/Me', CheckAuth, Edit_User_Password)



export default Auth_Login