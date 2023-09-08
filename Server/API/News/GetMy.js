
import  NewsModel from "../../Mongo/Models/NewsModel.js";

export const globalNews = (req, res) => {
    NewsModel.find({sendTo: "Global" , faculty: req.user.faculty}).then((News) => {
        if (News.length !== 0) {
            console.log(News.length + " News Found ");
            res.send(News)
        } else {
            console.log(" 0 Found ");
            res.send([])
        }
    }).catch((err) => {
        console.log(err.message)
    })
}
export const OwnNews = (req, res) => {
    if (req.user) {
        const userRole = req.user.role;
        const sendToRole = userRole + 's';
        let filter = { sendTo: sendToRole };
        if (sendToRole === 'Students' ) {
            filter = { ...filter, $or: [{ studentGroup: req.user.academicYear }, { studentGroup: 'All' }]};
        }
        NewsModel.find(filter)
            .then((news) => {
                if (news.length !== 0) {
                    console.log(news.length + ' News Found');
                    res.send(news);
                } else {
                    console.log('0 Found');
                    res.send([]);
                }
            })
            .catch((err) => {
                console.log(err.message);
                res.status(500).send('Error retrieving news');
            });
    } else {
        res.status(401).send('Unauthorized');
    }
};

export const PostedNews = (req, res) => {
    NewsModel.find({email: req.user.email ,name:req.user.name}).then((News) => {
        if (News.length !== 0) {
            console.log(News.length + " News Found");
            res.send(News)
        } else {
            console.log(" 0 Found ");
            res.send([])
        }
    }).catch((err) => {
        console.log(err.message)
    })
}

