export default function Alerts({ alerts }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded">
      <h2 className="font-semibold mb-2">📢 Alerts</h2>
      {alerts.length ? (
        <ul className="list-disc ml-5">
          {alerts.map((a, i) => (
            <li key={i}>
              {a.pair} → target {a.targetRate}
            </li>
          ))}
        </ul>
      ) : (
        <p>No alerts set</p>
      )}
    </div>
  );
}
