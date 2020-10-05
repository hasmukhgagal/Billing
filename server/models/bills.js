const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const UserSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId, // how we associate each account with a user
    ref: "users",
  },
  billData: {
    type: Object,
    required: false,
  },
  name: {
    type: String,
    required: false,
  },
  number: {
    type: String,
    required: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
module.exports = Bill = mongoose.model("bills", UserSchema);
