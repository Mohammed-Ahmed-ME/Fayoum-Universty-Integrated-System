import MailModel from "../../Mongo/Models/MailModel.js";
import UserModel from "../../Mongo/Models/UserModel.js";

export const GetAllDetails = async (req, res) => {
    try {
        const Response = {
            FullAdministrators: await UserModel.countDocuments({ role: "Full Administrator", faculty: req.user.faculty }),
            Administrators: await UserModel.countDocuments({ role: "Administrator", faculty: req.user.faculty }),
            Professors: await UserModel.countDocuments({ role: "Professor", faculty: req.user.faculty }),
            TeachingAssistants: await UserModel.countDocuments({ role: "Teaching Assistant", faculty: req.user.faculty }),
            ResearchAssistants: await UserModel.countDocuments({ role: "Professor", faculty: req.user.faculty }),
            AssistantProfessors: await UserModel.countDocuments({ role: "Assistant Professor", faculty: req.user.faculty }),
            FirstYear: await UserModel.countDocuments({ academicYear: "1st Year", role: "Student", faculty: req.user.faculty }),
            SecondYear: await UserModel.countDocuments({ academicYear: "2nd Year", role: "Student", faculty: req.user.faculty }),
            ThirdYear: await UserModel.countDocuments({ academicYear: "3rd Year", role: "Student", faculty: req.user.faculty }),
            FourthYear: await UserModel.countDocuments({ academicYear: "4th Year", role: "Student", faculty: req.user.faculty }),
            FifthYear: await UserModel.countDocuments({ academicYear: "5th Year", role: "Student", faculty: req.user.faculty }),
            Students: await UserModel.countDocuments({ role: "Student", faculty: req.user.faculty }),
            AcceptedReq: await MailModel.countDocuments({ status: "Accepted",sendTo: req.user.email}),
            RejectedReq: await MailModel.countDocuments({ status: "Rejected", sendTo: req.user.email }),
            PendingReq: await MailModel.countDocuments({ status: "Pending",sendTo: req.user.email })
        };

        res.status(200).send(Response);
    } catch (error) {
        res.status(501).send(error.message);
    }
};
