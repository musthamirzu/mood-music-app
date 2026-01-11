const SongList = ({ songs }) => {
  if (!songs || songs.length === 0) {
    return (
      <p className="text-gray-500 dark:text-gray-400 text-sm">
        No songs available.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {songs.map((song) => (
        <div
          key={song._id}
          className="
            flex flex-col sm:flex-row sm:items-center sm:justify-between
            rounded-xl border border-gray-200 dark:border-gray-700
            bg-white dark:bg-gray-800
            px-5 py-4 shadow-sm
            hover:shadow-md transition
          "
        >
          {/* Song Name */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
              Song Name:
            </span>
            <span className="font-medium text-gray-900 dark:text-gray-100">
              {song.title}
            </span>
          </div>

          {/* Artist */}
          <div className="flex items-center gap-2 mt-2 sm:mt-0">
            <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
              Artist:
            </span>
            <span className="font-medium text-gray-800 dark:text-gray-200">
              {song.artist}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SongList;
