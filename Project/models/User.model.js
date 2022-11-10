const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    birthday: {
      type: Date, 
      required: true
    },
    gender: {
      type: String, 
      required: true,
      enum: ['male', 'female', 'they']
    }, 
    status: {
      type: String,
      required: true,
      enum: ['single', 'in a relationship']
    },
    activityIds: {
      type: [{ type: Schema.Types.ObjectId, ref: 'Activity' }],
    },

    description: {
      type: String,
    },
    image: {
      type: String, //Link
      unique: true

    }
  },
  
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
