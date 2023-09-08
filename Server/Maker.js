// Assuming you have Express and the UserModel imported

// Import necessary modules and setup Express app
import express from 'express';
const app = express();

app.post('/users/:userId/subjects', async (req, res) => {
    const { userId } = req.params;
    const { type, degree } = req.body;

    try {
        // Find the user by ID
        const user = await UserModel.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Add the subject to the user's subjects array
        user.subjects.push({ type, degree });

        // Save the updated user
        await user.save();

        res.status(200).json({ message: 'Subject added successfully', user });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
