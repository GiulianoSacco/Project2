const express = require('express');
const router = express.Router();

const Activity = require("../models/Activity.model")


router.get("/", async (req, res) => {
  const user = req.session.currentUser;
  console.log("inside route")
    try{
      const activityDb = await Activity.find()
      //  console.log(activityDb)
       res.render("index", {activityDb, user});
   }catch(err){
       console.log(err)
   }
  });


module.exports = router;
