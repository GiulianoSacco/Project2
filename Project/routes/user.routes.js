const express = require("express");
const router = express.Router();

const User = require("../models/User.model")

const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");



router.get("/user-profile", isLoggedIn, async (req, res) => {
    const user = req.session.currentUser;
    // console.log(user)

    try {
        const userProfile = await User.findById(user._id).populate("activityIds")
        // console.log(userProfile)
        res.render("user/user-profile", {userProfile, user})

    } catch (error) {
        console.log(error)
    }

})



module.exports = router


