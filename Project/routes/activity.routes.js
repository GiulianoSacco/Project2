const express = require('express');
const router = express.Router();

const Activity = require("../models/Activity.model")
const User = require("../models/User.model")
const isLoggedIn = require("../middleware/isLoggedIn");
const isLoggedOut = require("../middleware/isLoggedOut");



router.get("/create", (req, res) => {
  const user = req.session.currentUser
  res.render("activity/new-activity", {user})
})



router.post("/create", async (req, res) => {
  const {activity, description, find, from, to} = req.body
  const author = req.session.currentUser._id
  try{
      const newActivity = await Activity.create({author, activity, description, find, from, to})
      const userUpdated = await User.findByIdAndUpdate(author, { $push: { activityIds: newActivity._id } })
      res.redirect("/")
  }catch (err){
      console.log(err)
      res.render("activity/new-activity")
  }
})


router.get("/description/:activityId", async (req, res) => {
  const user = req.session.currentUser;
  const {activityId}  = req.params
  try{
    const act = await Activity.findById(activityId).populate("author")
    // console.log(act)
    res.render("activity/activity-description", {act, user})
  }catch(err){
     console.log(err)
  }
});



router.get('/edit/:activityId', async (req, res) => {
  const user = req.session.currentUser;
  const { activityId } = req.params
  try{
  const actiDb = await Activity.findById(activityId)
  res.render("activity/edit-activity", {actiDb,user})
}catch(err){
  console.log(err)
}
});

router.post('/edit/:activityId', async (req, res, next) => {
  const { activityId } = req.params;
  // console.log(activityId)
  const { activity, description, find, from, to} = req.body;

  // console.log(description)

  try{
  const actiDb = await Activity.findByIdAndUpdate(activityId, { activity, description, find, from, to}, { new: true })
  res.redirect(`/user-profile`)

  }catch(err){
    console.log(err)
  }
});

router.post('/description/:activityId/delete', async (req, res) => {
  const {activityId}  = req.params;
 try{
    const deletedb = await Activity.findByIdAndDelete(activityId)
    res.redirect('/user-profile')
 }catch(errr){
    console.log(errr);
 } 
 
    
});



module.exports = router



