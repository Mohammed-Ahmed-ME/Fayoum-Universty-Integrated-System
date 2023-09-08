

export const LogoutUser = async (req, res) => {
    try {
        req.user.loginTokens =  []
        await req.user.save()
        res.send("Logged Out From All Session's Successfully!")
    }
    catch (err) {
        console.log(err.message)
    }
}