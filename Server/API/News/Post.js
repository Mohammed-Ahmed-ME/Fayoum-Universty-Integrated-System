
import NewsModel from "../../Mongo/Models/NewsModel.js";

export const PostNews = (req, res) => {
            const name = req.user.name
            const img = req.user.img
            const email = req.user.email
            const faculty = req.user.faculty
            const role = req.user.role
            const userNews = req.body.userNews
            const sendTo = req.body.sendTo
            const studentGroup = req.body.studentGroup
            const Data = { role, userNews, sendTo,faculty,email,img,name,studentGroup}
            const newNews = new NewsModel(Data)
            newNews.save().then(() => {
                console.log("News Add By " +  name );
                res.send("News Add By '" +  name )
            }).catch((err) => {
                console.log(err.message)
                res.status(400).send(err.message)
            })
}