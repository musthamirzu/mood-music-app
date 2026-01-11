import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import MoodCard from "../components/MoodCard";
import SongList from "../components/SongList";

const Home = () => {
  const [moods, setMoods] = useState([]);
  const [selectedMood, setSelectedMood] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const fetchMoods = async () => {
    setLoading(true);
    const res = await API.get("/moods");
    setMoods(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchMoods();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this mood?"
    );
    if (!confirmed) return;

    try {
      setDeletingId(id);
      await API.delete(`/moods/${id}`);
      setSelectedMood(null);
      fetchMoods();
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">

      
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-semibold bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">
            My Music
          </h1>

          <Link
            to="/add"
            className="rounded-lg bg-indigo-600 px-5 py-2 text-white text-sm font-medium shadow hover:bg-indigo-700 transition"
          >
            Add Mood
          </Link>
        </div>
      </header>

      
      <main className="max-w-7xl mx-auto px-6 py-10 space-y-14">

        
        {loading && (
          <div className="flex justify-center">
            <span className="text-gray-500 text-sm animate-pulse">
              Loading moods...
            </span>
          </div>
        )}

    
        {!loading && moods.length === 0 && (
          <div className="max-w-xl mx-auto bg-gradient-to-br from-indigo-500 to-purple-500 p-[2px] rounded-xl">
            <div className="bg-white rounded-xl p-10 text-center">
              <p className="text-gray-600 text-lg">
                No moods available
              </p>
              <Link
                to="/add"
                className="inline-block mt-4 text-indigo-600 font-medium hover:underline"
              >
                Create your first mood
              </Link>
            </div>
          </div>
        )}

       
        {!loading && moods.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-700">
                Your Playlists
              </h2>
              <span className="text-sm text-gray-500">
                {moods.length} total
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {moods.map((mood) => (
                <MoodCard
                  key={mood._id}
                  mood={mood}
                  onSelect={() => setSelectedMood(mood)}
                  onDelete={() => handleDelete(mood._id)}
                  deleting={deletingId === mood._id}
                />
              ))}
            </div>
          </section>
        )}

        
        {selectedMood && (
  <section className="pt-12">
    
    <div className="relative max-w-4xl mx-auto rounded-3xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-[2px]">
      
      
      <div className="rounded-3xl bg-white dark:bg-gray-900 shadow-xl p-8 md:p-10">

        
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
              Recommended Songs
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Based on your selected mood
            </p>
          </div>

        
          <span className="
            inline-flex items-center rounded-full
            bg-indigo-50 dark:bg-gray-800
            px-4 py-1.5 text-sm font-medium
            text-indigo-700 dark:text-indigo-400
            border border-indigo-100 dark:border-gray-700
          ">
            {selectedMood.moodName}
          </span>
        </div>

       
        {selectedMood.songs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              No songs have been added for this mood yet.
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Add songs to get personalized recommendations.
            </p>
          </div>
        ) : (
          <div className="relative">
            
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-50 to-pink-50 dark:from-gray-800 dark:to-gray-900 opacity-40 pointer-events-none" />

            
            <div className="relative">
              <SongList songs={selectedMood.songs} />
            </div>
          </div>
        )}
      </div>
    </div>
  </section>
)}

      </main>
    </div>
  );
};

export default Home;
