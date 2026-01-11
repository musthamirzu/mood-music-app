const Mood = require("../models/Mood");


exports.createMood = async (req, res) => {
  try {
    const { moodName, songs } = req.body;

    if (!moodName || !Array.isArray(songs) || songs.length === 0) {
      return res.status(400).json({
        message: "Mood name and at least one song are required"
      });
    }

    const mood = await Mood.create({ moodName, songs });
    res.status(201).json(mood);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getAllMoods = async (req, res) => {
  try {
    const moods = await Mood.find().sort({ createdAt: -1 });
    res.status(200).json(moods);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getMoodById = async (req, res) => {
  try {
    const mood = await Mood.findById(req.params.id);

    if (!mood) {
      return res.status(404).json({ message: "Mood not found" });
    }

    res.status(200).json(mood);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateMood = async (req, res) => {
  try {
    const { moodName, songs } = req.body;

    const mood = await Mood.findById(req.params.id);

    if (!mood) {
      return res.status(404).json({ message: "Mood not found" });
    }

    if (moodName) mood.moodName = moodName;
    if (songs) mood.songs = songs;

    await mood.save();
    res.status(200).json(mood);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.deleteMood = async (req, res) => {
  try {
    const mood = await Mood.findByIdAndDelete(req.params.id);

    if (!mood) {
      return res.status(404).json({ message: "Mood not found" });
    }

    res.status(200).json({ message: "Mood deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.deleteSong = async (req, res) => {
  try {
    const { id, songId } = req.params;

    const mood = await Mood.findById(id);
    if (!mood) {
      return res.status(404).json({ message: "Mood not found" });
    }

    mood.songs = mood.songs.filter(
      song => song._id.toString() !== songId
    );

    await mood.save();
    res.status(200).json(mood);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
