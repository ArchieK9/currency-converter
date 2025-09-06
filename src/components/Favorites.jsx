export default function Favorites({ favorites }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded">
      <h2 className="font-semibold mb-2">⭐ Favorites</h2>
      {favorites.length ? (
        <ul className="list-disc ml-5">
          {favorites.map((f, i) => (
            <li key={i}>{f}</li>
          ))}
        </ul>
      ) : (
        <p>No favorites yet</p>
      )}
    </div>
  );
}
