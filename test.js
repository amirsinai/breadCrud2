const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String },
  password: String, // Shorthand for {type: String}
});

const User = mongoose.model("User", userSchema);

// console.log(User);
