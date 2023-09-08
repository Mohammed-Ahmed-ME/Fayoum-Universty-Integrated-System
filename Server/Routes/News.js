import express from "express";
import {globalNews, OwnNews, PostedNews} from "../API/News/GetMy.js"
import {PostNews} from "../API/News/Post.js"
import {DeleteNews} from "../API/News/Delete.js"
import {CheckAuth} from "../API/Middleware/Check Auth.js";
const News = express.Router()




News.get("/News/Global/News", CheckAuth,globalNews)
News.get("/News/Own/News", CheckAuth,OwnNews)
News.get("/News/Posted/News", CheckAuth,PostedNews)
News.post("/New/News",CheckAuth, PostNews)
News.delete("/Delete/News/:ID", CheckAuth, DeleteNews)


export default News