import express from "express";
import {Check_User_Exist} from "../API/Middleware/Login.js";
const Login = new express.Router()




Login.post('/Login/User' ,Check_User_Exist)



export default Login