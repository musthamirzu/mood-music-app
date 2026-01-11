import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

const EditMood = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [moodName, setMoodName] = useState("");
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    API.get(`/moods/${id}`).then((res) => {
      setMoodName(res.data.moodName);
      setSongs(res.data.songs);
    });
  }, [id]);

  const updateMood = async () => {
    await API.put(`/moods/${id}`, { moodName, songs });
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-pink-50 to-purple-100 flex items-center justify-center px-4">
      
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-xl p-8">
        
        {/* HEADER */}
        <h2 className="text-3xl font-extrabold text-center mb-6 bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">
          ✏️ Edit Mood
        </h2>

        {/* MOOD NAME */}
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

        {/* SONG LIST */}
          <label className="block text-sm font-semibold text-gray-600 mb-2">
            Songs
          </label>
          
        <div className="space-y-4">
          {songs.map((song, i) => (
            <div
              key={i}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3"
            >
              <input
                value={song.title}
                onChange={(e) => {
                  const s = [...songs];
                  s[i].title = e.target.value;
                  setSongs(s);
                }}
                placeholder="🎵 Song Title"
                className="rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
              />

              <input
                value={song.artist}
                onChange={(e) => {
                  const s = [...songs];
                  s[i].artist = e.target.value;
                  setSongs(s);
                }}
                placeholder="🎤 Artist"
                className="rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>
          ))}
        </div>

        {/* UPDATE BUTTON */}
        <button
          onClick={updateMood}
          className="mt-8 w-full rounded-xl bg-gradient-to-r from-indigo-600 to-pink-600 py-3 text-white font-bold text-lg shadow hover:opacity-90 transition"
        >
          Update Mood
        </button>
      </div>
    </div>
  );
};

export default EditMood;
