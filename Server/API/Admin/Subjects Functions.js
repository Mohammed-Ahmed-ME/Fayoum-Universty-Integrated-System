import UserModel from "../../Mongo/Models/UserModel.js";

export const AddSubject = async (req, res) => {
    console.log("AddSubject")
    const { subjectCode, subjectName, ID } = req.body;
    const addBy = "Name: " + req.user.name + "  ID: " + req.user.nationalID + "  Role: " + req.user.role
    try {
        const user = await UserModel.findOne({ nationalID: ID });
        if (!user) {
            console.log("User not found")
            return res.status(404).send('User not found');
        }
        const subjectIndex = user.subjects.findIndex((subject) => subject.subjectCode === subjectCode);
        if (subjectIndex === -1) {
            user.subjects.push({subjectName, subjectCode, addBy}); // Include the addBy field in the push
            await user.save();
            console.log('Subject added successfully' );
            res.send( 'Subject added successfully');
        }
        else {
            console.log( 'Subject Already Existed');
            return res.status(404).send('Subject Already Existed');
        }

    } catch (error) {
        console.log(error);
        res.status(500).send('Internal server error' );
    }
}
export const RemoveSubject = async (req, res) => {
    const { subjectCode, ID } = req.body;
    try {
        const user = await UserModel.findOne({ nationalID: ID });
        if (!user) {
            return res.status(404).send( 'User not found' );
        }
        const subjectIndex = user.subjects.findIndex((subject) => subject.subjectCode === subjectCode);

        if (subjectIndex === -1) {
            return res.status(404).send( 'Subject not found for the user');
        }
        user.subjects.splice(subjectIndex, 1);
        await user.save();
        res.status(200).send( 'Subject removed successfully');
    } catch (error) {
        console.log(error);
        res.status(500).send( 'Internal server error' );
    }
}


export const EditSubject = async (req, res) => {
    const { subjectCode, ID , degree} = req.body;
    const whoUpdate = "Name: " + req.user.name + "  ID: " + req.user.nationalID + "  Role: " + req.user.role
    try {
        const user = await UserModel.findOne({ nationalID: ID });
        if (!user) {
            return res.status(404).send( 'User not found' );
        }
        const subjectIndex = user.subjects.findIndex((subject) => subject.subjectCode === subjectCode);

        if (subjectIndex === -1) {
            return res.status(404).send( 'Subject not found for the user');
        }
        user.subjects[subjectIndex].degree = degree
        user.subjects[subjectIndex].updatedBy.push({whoUpdate,degree})
        await user.save();
        res.status(200).send( 'Subject Degree Updated successfully For ' + user.name   + " His Grade: " + user.academicYear);
    } catch (error) {
        console.log(error);
        res.status(500).send( 'Internal server error' );
    }
}