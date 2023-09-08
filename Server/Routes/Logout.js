import express from "express";
const Logout = express.Router()
import {LogoutUser} from "../API/Users/Logout.js";
import { CheckAuth} from "../API/Middleware/Check Auth.js";

Logout.post("/Logout/User", CheckAuth ,LogoutUser)


export default Logout