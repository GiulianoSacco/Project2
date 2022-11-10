const mongoose = require("mongoose")

const Activity = require("../models/Activity.model")
const User = require("../models/User.model")

const MONGO_URI = "mongodb://localhost:27017/project2"



const activities = [
  {
    activity: "Hiking", 
    description: "Making a pilgrimage to Montserrat.",
    find: ["group of friends"],
    from: "11-11-2022",
    to: "11-11-2022",
    locations: "Sants",
    image: "https://www.barcelona-tourist-guide.com/images/ext/attractions/montserrat/L550/montserrat-barcelona-29.jpg"
  },
  {
    activity: "Drinks", 
    description: "Looking to go out for some drinks on top of Barcelona",
    find: ["date"],
    from: "11-11-2022",
    to: "11-11-2022",
    locations: "Eixample",
    image: "https://estaticos-cdn.elperiodico.com/clip/89afd1ee-ec20-4651-bbb3-d7c9ba5144cc_alta-libre-aspect-ratio_default_0.jpg"
  },
  {
    activity: "Lunch", 
    description: "Tapas hopping around Barcelona",
    find: ["couple"],
    from: "11-11-2022",
    to: "11-11-2022",
    locations: "Sant Marti",
    image: "https://img.theculturetrip.com/wp-content/uploads/2016/02/IMG_4426.jpg"
  }
]




const users = [
  {
    fullName: "Pepe",
    username: "pepe1",
    email: "pepe1@gmail.com",
    password: "123456", 
    status: "single",
    image: "https://upload.wikimedia.org/wikipedia/commons/5/55/Pepe_2018.jpg"
  },
  {
    fullName: "Brittany",
    username: "wanderingWonder",
    email: "brittany@gmail.com",
    password: "123456", 
    status: "single",
    image: "https://static6.depositphotos.com/1008303/626/i/450/depositphotos_6264851-stock-photo-beautiful-caucasian-woman-outdoor.jpg"
  },
  {
    fullName: "Anna",
    username: "AwesomeAnna",
    email: "anna@gmail.com",
    password: "123456", 
    status: "in a relationship",
    image: "https://media.istockphoto.com/id/1368004438/photo/shot-of-a-couple-enjoying-a-day-at-the-beach.jpg?s=612x612&w=0&k=20&c=hMi6N-u6baFHC-P8C-8X_5iFshdPPicx7BCrBGM8ARc="
  }
]




const createSeeds = async function () {
  try {
    const connect = await mongoose.connect(MONGO_URI)
    console.log("Test")
    console.log(`Connected to database: ${connect.connections[0].name}`)

   // const deleteAllActivities = await Activity.deleteMany()
    //console.log("Db activities clean")
    // const deleteAllUsers = await User.deleteMany()
    // console.log("Db users clean")

    //const dbActivities = await Activity.create(activities)
    //console.log(`activities created`)
    const dbUsers = await User.create(users)
    console.log(`users created`)

    const dbClose = await mongoose.connection.close()
    console.log("Seeds created") 

  } catch (error) {
    console.log(error)
  }
}

createSeeds()




















// const createSeeds = async function () {
//   try {
//     const connect = await mongoose.connect(MONGO_URI)
//     console.log(`Connected to database: ${connect.connections[0].name}`)

//     // Clear DB,  Example: (-- const deleteAll = await Book.deleteMany() --)
//     // console.log("Db clean")

//     const dbClose = await mongoose.connection.close()
//     console.log("Seeds created")
//   } catch (err) {
//     console.log(`Error creating the seeds: ${err}`)
//   }
// }

// createSeeds()
