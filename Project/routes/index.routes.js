const express = require('express');
const router = express.Router();

const Activity = require("../models/Activity.model")


router.get("/", async (req, res) => {
  const user = req.session.currentUser;
  console.log("inside route")
    try{
      const activityDb = await Activity.find()
       
       activityDb.forEach( (act) => {
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

       res.render("index", {activityDb, user});
   }catch(err){
       console.log(err)
   }
  });


module.exports = router;
