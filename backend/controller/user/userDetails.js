const userModel = require("../../models/userModel");

async function userDetailController(req, res) {
    try {
        const user = await userModel.findById(req.userId);
        res.status(200).json({
            message : "User Details",
            data : user,
            success : true,
            error : false
        })
    } catch (error) {
        res.status(400).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

module.exports = userDetailController;