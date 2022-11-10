const { Schema, model } = require("mongoose");

const actSchema = new Schema(
  {
    author: { type: Schema.Types.ObjectId, ref: 'User'
    },
    activity: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    find: {
        type: Array,
        items: {
          enum: [ "Couple", "Group of friends", "Date", "Family" ]
        },
        "uniqueItems": true,
        "minItems": 1
    
    },
    
    from: {
      type: Date,
      required: true,
      
    },
    to: {
      type: Date,
      required: true,
    },

    locations: {
      type: String,
      items: {
        enum: ["Ciutat Vella", "Nou Barris","Horta-Guinardo", "Sarria-Sant Gervasi", "Les Corts", "Gracia", "Sants", "Eixample", "Sant Marti", "Sant Andreu" ]
    },
      "uniqueItems": true,
      "minItems": 1
  },

    image: {
      type: String, //Link
      unique: true
    }

    

  },
  {
    timestamps: true,
  }
);

const Activity = model("Activity", actSchema);

module.exports = Activity;