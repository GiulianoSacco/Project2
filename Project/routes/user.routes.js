const express = require("express");
const router = express.Router();

const User = require("../models/User.model")

const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");



router.get("/user-profile", isLoggedIn, async (req, res) => {
    const user = req.session.currentUser;

    try {
        const userProfile = await User.findById(user._id).populate("activityIds")
        res.render("user/user-profile", {userProfile, user})

    } catch (error) {
        console.log(error)
    }

})

router.get("/user-profile/edit", isLoggedIn,  (req, res) => {
    // const user = req.session.currentUser
    res.render("user/edit-profile")
})

 router.post("/user-profile/edit", async (req, res) => {
     const {description} = req.body
     const userId = req.session.currentUser._id
     console.log(description)
     console.log(userId)
     try{
         const newdes = await User.findByIdAndUpdate(userId, {description: description})
         console.log(newdes)
         res.redirect("/user-profile")
     }catch (err){
         console.log(err)
         res.render("user/edit-profile")
     }
   })

router.get("/user-profile/:userId", isLoggedIn, async (req, res) => {
    const user = req.session.currentUser;
    const { userId } = req.params
    try {
        const userProfile = await User.findById(userId).populate("activityIds")
        console.log(userProfile)


       userProfile.activityIds.forEach( (act) => {
            const day = act.from.getUTCDay()
            const month = act.from.getUTCMonth()
            const year = act.from.getUTCFullYear()
            const hour = act.from.getUTCHours()
            const minute = act.from.getUTCMinutes()
    
            const day2 = act.to.getUTCDay()
            const month2 = act.to.getUTCMonth()
            const year2 = act.to.getUTCFullYear()
            const hour2 = act.to.getUTCHours()
            const minute2 = act.to.getUTCMinutes()

            act.finale = `${day}/${month}/${year}    ${hour}:${minute}`
            act.finale2 = `${day2}/${month2}/${year2}    ${hour2}:${minute2}`
        });
        


        res.render("user/user-profile", {userProfile, user})

    } catch (error) {
        console.log(error)
    }
})

router.get("/user-profile/edit", isLoggedIn,  (req, res) => {
    const user = req.session.currentUser
    res.render("user/edit-profile", user)
})

// router.post("/userProfile/edit", async (req, res) => {
//     const description = req.body
//     console.log(description)
//     try{
//         const newdes = await User.create(description)
//         res.redirect("/user-profile")
//     }catch (err){
//         console.log(err)
//         res.render("user/edit-profile")
//     }
//   })



module.exports = router

