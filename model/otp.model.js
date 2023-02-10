const { default: mongoose } = require("mongoose");
const { STATICDATA } = require("../util/static.util");

const otpSchema = new mongoose.Schema({
  otp: {
    type: String,
    trim: true,
    required: true
  },
  field: {
    type: String,
    trim: true,
    required: true

  },
  type: {
    type: String,
    enum: STATICDATA.fieldType,
    trim: true,
    required: true

  },
  createdBy: {
    type: String,
    trim: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("otpModel", otpSchema);
