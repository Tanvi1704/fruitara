const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide your name"],
    },
    email: {
      type: String,
      required: [true, "Please provide your email address"],
      unique: true,
      validate: [validator.isEmail, "Please Provide email"],
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: 8,
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, "Please Confirm Your Password"],
      minlength: 8,
      select: false,
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: "password are not match",
      },
      select : false,
    },
    passwordChangedAt : Date,
    isVerified: {
      type: Boolean,
      default: false,
    },
    otp: {
      type: Number,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    profileImage: {
      type: String,
      required: true,
    },
      street : {
        type : String,
        required : false,
      },
      city : {
        type : String, 
        required : false,
      },
      state : {
        type : String,
        required : false,
      },
      zipcode : {
        type : String,
        required : false,
      },
      country : {
        type : String,
        required : false,
      }
    },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);
