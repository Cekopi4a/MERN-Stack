const mongoose = require("mongoose");

const callSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true
    },
    userTable: {
        type: String,
        required: true
      },
    date: {
        type: Date,
    },
    isCompleted: {
        type: Boolean,
        default: false,
    },
    },
  { timestamps: true }
);

module.exports = mongoose.model("CallClient", callSchema);