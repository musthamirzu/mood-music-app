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
      setSongRowError("Please fill the previous song before adding a new one.");
      return;
    }

    setSongRowError("");
    setSongs([...songs, { title: "", artist: "" }]);
  };
  const goBack = () => {
    navigate("/")

  }

  const removeSong = (index) => {
    if (songs.length === 1) return;
    const updated = songs.filter((_, i) => i !== index);
    setSongs(updated);
  };

  const handleChange = (index, field, value) => {
    const updated = [...songs];
    updated[index][field] = value;
    setSongs(updated);
  };

  const validate = () => {
    const newErrors = {};

    if (!moodName.trim()) {
      newErrors.moodName = "Mood name is required";
    }

    songs.forEach((song, i) => {
      if (!song.title.trim()) newErrors[`title-${i}`] = "Song title required";
      if (!song.artist.trim()) newErrors[`artist-${i}`] = "Artist name required";
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitMood = async () => {
    if (!validate()) return;

    try {
      setLoading(true);

      await API.post("/moods", {
        moodName: moodName.trim(),
        songs,
      });

      navigate("/");
    } catch {
      alert("Failed to save mood. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-pink-50 to-purple-100 flex items-center justify-center px-4">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-xl p-8">

        <h2 className="text-3xl font-extrabold text-center mb-6 bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">
          Add New Mood
        </h2>
        <div className="flex justify-start mb-6">
          <button
            type="button"
            onClick={goBack}
            className="text-sm font-medium text-indigo-600 hover:text-indigo-700 hover:underline transition"
          >
            ← Back to Home
          </button>
        </div>

   
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-600 mb-2">
            Mood Name
          </label>
          <input
            value={moodName}
            onChange={(e) => setMoodName(e.target.value)}
            className="w-full rounded-xl border px-4 py-3 focus:ring-2 focus:ring-indigo-500"
          />
          {errors.moodName && (
            <p className="text-red-500 text-sm mt-1">{errors.moodName}</p>
          )}
        </div>

        {/* SONGS */}
        <div className="space-y-4">
          {songs.map((song, i) => (
            <div
              key={i}
              className="relative grid grid-cols-1 sm:grid-cols-2 gap-3"
            >
              <input
                value={song.title}
                onChange={(e) => handleChange(i, "title", e.target.value)}
                placeholder="Song Title"
                className="rounded-xl border px-4 py-3 focus:ring-2 focus:ring-pink-400"
              />

              <input
                value={song.artist}
                onChange={(e) => handleChange(i, "artist", e.target.value)}
                placeholder="Artist"
                className="rounded-xl border px-4 py-3 focus:ring-2 focus:ring-purple-400"
              />

              {songs.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeSong(i)}
                  className="
                    absolute -top-2 -right-2
                    h-6 w-6 rounded-full
                    bg-red-500 text-white text-xs
                    flex items-center justify-center
                    hover:bg-red-600 transition
                  "
                  title="Remove song"
                >
                  ×
                </button>
              )}
            </div>
          ))}
        </div>

        {songRowError && (
          <p className="text-red-500 text-sm mt-2">{songRowError}</p>
        )}

        <button
          type="button"
          onClick={addSongField}
          className="mt-5 w-full rounded-xl border border-dashed border-indigo-400 py-3 text-indigo-600 font-semibold hover:bg-indigo-50 transition"
        >
          Add Another Song
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
