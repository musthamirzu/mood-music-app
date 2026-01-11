import { Link } from "react-router-dom";

const gradients = [
  "from-pink-500 to-rose-500",
  "from-indigo-500 to-purple-500",
  "from-emerald-500 to-teal-500",
  "from-orange-500 to-amber-500",
  "from-sky-500 to-cyan-500",
];

const MoodCard = ({ mood, onSelect, onDelete, deleting }) => {
  const gradient =
    gradients[mood.moodName.length % gradients.length];

  return (
    <div
      onClick={onSelect}
      className={`cursor-pointer rounded-2xl bg-gradient-to-br ${gradient} p-[2px] transition-transform hover:scale-[1.02]`}
    >
      <div className="rounded-2xl bg-white p-6 shadow-md">
        <h3 className="text-xl font-bold text-gray-800 mb-1">
          {mood.moodName}
        </h3>

        <p className="text-sm text-gray-500 mb-4">
          {mood.songs.length} songs
        </p>

        <div className="flex justify-between items-center">
          <Link
            to={`/edit/${mood._id}`}
            onClick={(e) => e.stopPropagation()}
            className="text-indigo-600 font-medium hover:underline"
          >
            Edit
          </Link>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            disabled={deleting}
            className="text-red-600 font-medium hover:underline disabled:opacity-50"
          >
            {deleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MoodCard;
