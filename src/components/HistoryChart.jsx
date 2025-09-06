import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const API_KEY = import.meta.env.VITE_EXCHANGE_API_KEY;
const BASE_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}`;

export default function HistoryChart({ from, to }) {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    // Using exchangerate.host API for timeseries
    const end = new Date().toISOString().split("T")[0];
    const start = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0];

    fetch(
      `https://api.exchangerate.host/timeseries?start_date=${start}&end_date=${end}&base=${from}&symbols=${to}`
    )
      .then((res) => res.json())
      .then((data) => {
        const rates = Object.entries(data.rates).map(([date, val]) => ({
          date,
          rate: val[to],
        }));
        setHistory(rates);
      });
  }, [from, to]);

  if (!history.length) return null;

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded w-full h-5/12">
      <h2 className="font-semibold mb-2">📈 Last 7 Days</h2>
      <Line
        data={{
          labels: history.map((h) => h.date),
          datasets: [
            {
              label: `${from} → ${to}`,
              data: history.map((h) => h.rate),
              borderColor: "blue",
              fill: false,
            },
          ],
        }}
      />
    </div>
  );
}
