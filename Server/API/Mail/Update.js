import MailModel from "../../Mongo/Models/MailModel.js";

export const UpdateMail = (req, res) => {
    const Update = {...req.body , agreedBy:req.user.name + " Role: " + req.user.role + " Faculty " + req.user.faculty }
    MailModel.findOneAndUpdate({requestId: req.params.ID}, Update,{new:true,runValidators:true}).then(async (Mail)=>{
        if(Mail !== null){
            res.status(200).send(` Mail: ${Mail.UserMessage} which Belong to : ${Mail.name}  National_ID : ${Mail.national_id}  updated successfully! `  )
        }
        else {

            res.status(404).send( "Mail not found")
        }
    }).catch((err)=>{
        res.status(500).send(err.message)
    })
}