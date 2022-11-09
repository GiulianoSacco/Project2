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
          enum: [ "couple", "group of friends", "date", "family" ]
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
    image: {
      type: String, //Link
      unique: true
    }
    // location: {
    //   type: Location
    // }
    
  },
  {
    timestamps: true,
  }
);

const Activity = model("Activity", actSchema);

module.exports = Activity;