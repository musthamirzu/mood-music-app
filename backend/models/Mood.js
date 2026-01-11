const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  artist: {
    type: String,
    required: true,
    trim: true
  }
});

const moodSchema = new mongoose.Schema(
  {
    moodName: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    songs: [songSchema]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Mood", moodSchema);
