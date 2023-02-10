const { default: mongoose } = require("mongoose");
const { STATICDATA } = require("../util/static.util");

const userModelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    mobileNo: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    userName: {
      type: String,
      unique: true,
      trim: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    createdBy: {
      type: String,
      enum: STATICDATA.role,
      default: "user",
    },
    updatedBy: {
      type: String,
      enum: STATICDATA.role,
      default: "user",
    },
    isVerified: {
      email: {
        type: Boolean,
        default: false,
      },
      phoneNumber: {
        type: Boolean,
        default: false,
      },
    },
  },
  {
    timestamps: true,
  }
);

// Compile model from schema
module.exports = mongoose.model("userModel", userModelSchema);
