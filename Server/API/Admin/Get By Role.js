import UserModel from "../../Mongo/Models/UserModel.js";
import util from "util";

const GetUsersByRole = async (req, res, role) => {
    try {
        const users = await UserModel.find({ role, faculty: req.user.faculty });

        if (users.length !== 0) {
            res.status(200).send(users);
            const dataSize = util.inspect(users).length;
            console.log(`Data size: ${dataSize} bytes`);
        } else {
            res.status(404).send("No users found");
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
};

export const GetFullAdministrators = async (req, res) => {
    await GetUsersByRole(req, res, "Full Administrator");
};

export const GetAdministrators = async (req, res) => {
    await GetUsersByRole(req, res, "Administrator");
};

export const GetProfessors = async (req, res) => {
    await GetUsersByRole(req, res, "Professor");
};

export const GetTeachingAssistants = async (req, res) => {
    await GetUsersByRole(req, res, "Teaching Assistant");
};

export const GetResearchAssistants = async (req, res) => {
    await GetUsersByRole(req, res, "Research Assistant");
};

export const GetAssistantProfessors = async (req, res) => {
    await GetUsersByRole(req, res, "Assistant Professor");
};

export const GetStudents = async (req, res) => {
    await GetUsersByRole(req, res, "Student");
};
