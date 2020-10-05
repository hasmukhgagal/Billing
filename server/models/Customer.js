const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const UserSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId, // how we associate each account with a user
    ref: "users",
  },
  name: {
    type: String,
    required: true,
  },
  number: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  
});
module.exports = Account = mongoose.model("account", UserSchema);
