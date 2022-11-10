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
  const {activity, description, find, from, to, locations} = req.body
  console.log(req.body)
  const author = req.session.currentUser._id
  try{
      const newActivity = await Activity.create({author, activity, description, find, from, to, locations})
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

    const day = act.from.getUTCDate()
    const month = act.from.getUTCMonth()
    const year = act.from.getUTCFullYear()
    const hour = act.from.getUTCHours()
    const minute = act.from.getUTCMinutes()

    const day2 = act.to.getUTCDate()
    const month2 = act.to.getUTCMonth()
    const year2 = act.to.getUTCFullYear()
    const hour2 = act.to.getUTCHours()
    const minute2 = act.to.getUTCMinutes()

    const finale = `${day}/${month}/${year}    ${hour}:${minute}`
    const finale2 = `${day2}/${month2}/${year2}    ${hour2}:${minute2}`
    console.log(finale)
    const locations = [{
      id: 1,
      name: "Ciutat Vella",
      pos: [ 2.180933, 41.383544],
    },
    {
      id: 2,
      name: "Nou Barris",
      pos: [2.179175, 41.444874],
    },
    {
      id: 3,
      name: "Horta-Guinardo",
      pos: [2.151573, 41.432499],
    },
    {
      id: 4,
      name: "Sarria-Sant Gervasi",
      pos: [2.136936, 41.401916], 
    },
    {
      id: 5,
      name: "Les Corts",
      pos: [2.122439, 41.387085],
    },
    {
      id: 6,
      name: "Gracia",
      pos: [2.156774, 41.410478],
    },
    {
      id: 7,
      name: "Sants",
      pos: [2.136801, 41.376766], 
    },
    {
      id: 8,
      name: "Eixample",
      pos: [2.168374, 41.393614], 
    },
    {
      id: 9,
      name: "Sant Marti",
      pos: [2.203643, 41.407387], 
    },
    {
      id: 10,
      name: "Sant Andreu",
      pos: [2.189851, 41.436905], 
    },

    ]
    
    // Define the dislay of the map Paso 8
    const mapCenter = [2.163887, 41.392620]
    const mapZoom = 6
  
    // Render the map Paso 9
    res.render("activity/activity-description", {act, user, finale, finale2, locations, mapCenter, mapZoom})


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

  const { activity, description, find, from, to} = req.body;


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

router.get("/map", (req, res) => {
  // Define the locations of the map with the info we want to display in the popup Paso 7
  const locations = [{
    id: 1,
    name: "Barcelona",
    pos: [2.154007, 41.390205],
    img: "https://zfbarcelona.es/wp-content/uploads/2021/01/czfb-web-portada2-768x343.jpg"
  }, {
    id: 2,
    name: "Madrid",
    pos: [-3.703339, 40.416729],
    img: "https://www.coldwellbanker.es/wp-content/uploads/2022/04/madrid-2.jpeg"
  }, {
    id: 3,
    name: "Olot",
    pos: [2.488024, 42.182208],
    img: "https://es.turismegarrotxa.com/img-municipi-3200-1800/volca-montsacopa-dron-2019_001.jpg"
  },{
    id: 4,
    name: "Lisbon",
    pos: [-9.142685, 38.736946],
    img: "https://www.telegraph.co.uk/content/dam/Travel/Destinations/Europe/Portugal/Lisbon/lisbon-lead-image.jpg?imwidth=680"
  }]
  
  // Define the dislay of the map Paso 8
  const mapCenter = [-3.703339, 40.416729]
  const mapZoom = 5

  // Render the map Paso 9
  res.render("activity/activity-description", { locations, mapCenter, mapZoom  })

})



module.exports = router



