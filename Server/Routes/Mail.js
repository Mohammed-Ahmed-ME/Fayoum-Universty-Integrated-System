import express from "express";
import { MailInbox, MailOutbox} from "../API/Mail/Get My Requests.js";
import {NewMail} from "../API/Mail/Post.js";
import {DeleteMail} from "../API/Mail/Delete.js"
import {CheckAuth} from "../API/Middleware/Check Auth.js";
import {UpdateMail} from "../API/Mail/Update.js";
const Mail = express.Router()




Mail.get("/Mail/Inbox", CheckAuth,MailInbox)
Mail.get("/Mail/Outbox", CheckAuth,MailOutbox)
Mail.post("/New/Mail",CheckAuth, NewMail)
Mail.delete("/Delete/Mail/:ID",CheckAuth, DeleteMail)
Mail.patch("/Update/Mail/:ID",CheckAuth, UpdateMail)


export default Mail