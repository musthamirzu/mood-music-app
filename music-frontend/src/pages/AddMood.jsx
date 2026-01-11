import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

const AddMood = () => {
  const [moodName, setMoodName] = useState("");
  const [songs, setSongs] = useState([{ title: "", artist: "" }]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
 const [songRowError, setSongRowError] = useState("");

  const navigate = useNavigate();

 const addSongField = () => {
  const lastSong = songs[songs.length - 1];

  if (!lastSong.title.trim() || !lastSong.artist.trim()) {
    setSongRowError("Please fill the previous song details first");
    return;
  }

  setSongRowError("");
  setSongs([...songs, { title: "", artist: "" }]);
};


  const handleChange = (index, field, value) => {
    const updated = [...songs];
    updated[index][field] = value;
    setSongs(updated);
  };

  // 🔍 VALIDATION LOGIC
  const validate = () => {
    const newErrors = {};

    // Mood validation
    if (!moodName.trim()) {
      newErrors.moodName = "Mood name is required";
    } else if (moodName.trim().length < 2) {
      newErrors.moodName = "Mood name must be at least 2 characters";
    }

    // Songs validation
    const validSongs = songs.filter(
      (s) => s.title.trim() && s.artist.trim()
    );

    if (validSongs.length === 0) {
      newErrors.songs = "At least one valid song is required";
    }

    songs.forEach((song, i) => {
      if (!song.title.trim()) {
        newErrors[`title-${i}`] = "Song title required";
      }
      if (!song.artist.trim()) {
        newErrors[`artist-${i}`] = "Artist name required";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitMood = async () => {
    if (!validate()) return;

    try {
      setLoading(true);

      // Send only valid songs
      const cleanSongs = songs.filter(
        (s) => s.title.trim() && s.artist.trim()
      );

      await API.post("/moods", {
        moodName: moodName.trim(),
        songs: cleanSongs,
      });

      navigate("/");
    } catch (err) {
      alert(err,"Failed to save mood. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-pink-50 to-purple-100 flex items-center justify-center px-4">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-xl p-8">

        <h2 className="text-3xl font-extrabold text-center mb-6 bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">
          ➕ Add New Mood
        </h2>

        {/* Mood Name */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-600 mb-2">
            Mood Name
          </label>
          <input
            value={moodName}
            onChange={(e) => setMoodName(e.target.value)}
            placeholder="e.g. Happy, Love, Chill"
            className="w-full rounded-xl border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {errors.moodName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.moodName}
            </p>
          )}
        </div>

        {/* Songs */}
        <div className="space-y-4">
          {songs.map((song, i) => (
            <div key={i} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <input
                  value={song.title}
                  onChange={(e) =>
                    handleChange(i, "title", e.target.value)
                  }
                  placeholder="🎵 Song Title"
                  className="w-full rounded-xl border px-4 py-3 focus:ring-2 focus:ring-pink-400"
                />
                {errors[`title-${i}`] && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors[`title-${i}`]}
                  </p>
                )}
              </div>

              <div>
                <input
                  value={song.artist}
                  onChange={(e) =>
                    handleChange(i, "artist", e.target.value)
                  }
                  placeholder="🎤 Artist"
                  className="w-full rounded-xl border px-4 py-3 focus:ring-2 focus:ring-purple-400"
                />
                {errors[`artist-${i}`] && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors[`artist-${i}`]}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {errors.songs && (
          <p className="text-red-500 text-sm mt-3">{errors.songs}</p>
        )}
{songRowError && (
  <p className="text-red-500 text-sm mt-2">
    {songRowError}
  </p>
)}

        <button
          onClick={addSongField}
          className="mt-5 w-full rounded-xl border-2 border-dashed border-indigo-400 py-3 font-semibold text-indigo-600 hover:bg-indigo-50 transition"
        >
          ➕ Add Another Song
        </button>

        <button
          onClick={submitMood}
          disabled={loading}
          className="mt-6 w-full rounded-xl bg-gradient-to-r from-indigo-600 to-pink-600 py-3 text-white font-bold text-lg shadow hover:opacity-90 transition disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Mood"}
        </button>
      </div>
    </div>
  );
};

export default AddMood;
