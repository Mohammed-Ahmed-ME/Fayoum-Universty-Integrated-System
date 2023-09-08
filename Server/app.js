import "./Mongo/Connect.js"
import express from "express"
import cors from "cors"
import Auth_Login from "./Routes/Authorized.js";
import Logout from "./Routes/Logout.js";
import UserRouts from "./Routes/User.js";
import Mail from "./Routes/Mail.js";
import News from "./Routes/News.js";
import Login from "./Routes/Login.js";
import { PORT } from "./API/Default.js"
const app = express();
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE ,PATCH');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
app.use(Auth_Login)
app.use(UserRouts)
app.use(Mail)
app.use(News)
app.use(Logout)
app.use(Login)

/////////////////////////// Listen Port //////////////////////////
app.listen( PORT, () => console.log(`Server is running on port ${ PORT }`))













