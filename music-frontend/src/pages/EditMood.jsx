import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

const EditMood = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [moodName, setMoodName] = useState("");
  const [songs, setSongs] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    API.get(`/moods/${id}`).then((res) => {
      setMoodName(res.data.moodName);
      setSongs(res.data.songs);
    });
  }, [id]);

 
  const addSong = () => {
    const lastSong = songs[songs.length - 1];

    if (!lastSong?.title.trim() || !lastSong?.artist.trim()) {
      setError("Please fill the previous song before adding a new one.");
      return;
    }

    setError("");
    setSongs([...songs, { title: "", artist: "" }]);
  };

  const removeSong = (index) => {
    const updated = songs.filter((_, i) => i !== index);
    setSongs(updated);
  };

  const updateMood = async () => {
    if (!moodName.trim()) {
      setError("Mood name cannot be empty.");
      return;
    }

    for (let song of songs) {
      if (!song.title.trim() || !song.artist.trim()) {
        setError("All songs must have a title and artist.");
        return;
      }
    }

    setError("");
    await API.put(`/moods/${id}`, { moodName, songs });
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-pink-50 to-purple-100 flex items-center justify-center px-4">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-xl p-8">

       
        <h2 className="text-3xl font-extrabold text-center mb-6 bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">
          Edit Mood
        </h2>

        {error && (
          <p className="mb-4 text-sm text-red-600 text-center">
            {error}
          </p>
        )}

        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-600 mb-2">
            Mood Name
          </label>
          <input
            value={moodName}
            onChange={(e) => setMoodName(e.target.value)}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

      
        <label className="block text-sm font-semibold text-gray-600 mb-2">
          Songs
        </label>

        <div className="space-y-4">
          {songs.map((song, i) => (
            <div key={i} className="grid grid-cols-1 sm:grid-cols-2 gap-3 relative">
              <input
                value={song.title}
                onChange={(e) => {
                  const s = [...songs];
                  s[i].title = e.target.value;
                  setSongs(s);
                }}
                placeholder="Song Title"
                className="rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
              />

              <input
                value={song.artist}
                onChange={(e) => {
                  const s = [...songs];
                  s[i].artist = e.target.value;
                  setSongs(s);
                }}
                placeholder="Artist"
                className="rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />

             
              {songs.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeSong(i)}
                  className="absolute -top-2 -right-2 text-xs bg-red-500 text-white rounded-full px-2 py-0.5 hover:bg-red-600"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>

        
        <button
          type="button"
          onClick={addSong}
          className="mt-6 w-full rounded-xl border border-dashed border-indigo-400 py-3 text-indigo-600 font-semibold hover:bg-indigo-50 transition"
        >
          Add Another Song
        </button>

        
        <button
          onClick={updateMood}
          className="mt-6 w-full rounded-xl bg-gradient-to-r from-indigo-600 to-pink-600 py-3 text-white font-bold text-lg shadow hover:opacity-90 transition"
        >
          Update Mood
        </button>
      </div>
    </div>
  );
};

export default EditMood;
