

import NewsModel from "../../Mongo/Models/NewsModel.js";

export const DeleteNews = (req, res) => {
    try {

         NewsModel.deleteOne({requestId:req.params.ID}).then(() => {
               console.log(" News deleted")
                res.send( " News deleted");


    })}catch (e) {
        res.send( "Error deleting News")
    }
}