const mongoose = require("mongoose");
const { Schema } = mongoose;
const bakerSchema = new Schema({
  name: {
    type: String,
    required: true,
    enum: ["Rachel", "Monica", "Joey", "Chandler", "Ross", "Phoebe"],
  },
  startDate: {
    type: Date,
    required: true,
  },
  bio: {
    Type: String,
  },
});

const Baker = mongoose.model("Baker", bakerSchema);

module.exports = Baker;
