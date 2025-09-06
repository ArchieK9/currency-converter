import { useState, useEffect } from "react";
import CurrencySelector from "./components/CurrencySelector.jsx";
import AmountInput from "./components/AmountInput.jsx";
import ConversionResult from "./components/ConversionResult.jsx";
import HistoryChart from "./components/HistoryChart.jsx";
import Favorites from "./components/Favorites.jsx";
import Alerts from "./components/Alerts.jsx";

const API_KEY = import.meta.env.VITE_EXCHANGE_API_KEY;
const BASE_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}`;

export default function App() {
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [amount, setAmount] = useState(1);
  const [rate, setRate] = useState(null);
  const [converted, setConverted] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [alerts, setAlerts] = useState([]);

  // Fetch available currencies
  useEffect(() => {
    fetch(`${BASE_URL}/latest/USD`)
      .then((res) => res.json())
      .then((data) => setCurrencies(Object.keys(data.conversion_rates)));
  }, []);

  // Convert currency
  useEffect(() => {
    if (fromCurrency && toCurrency && amount) {
      fetch(`${BASE_URL}/pair/${fromCurrency}/${toCurrency}/${amount}`)
        .then((res) => res.json())
        .then((data) => {
          setRate(data.conversion_rate);
          setConverted(data.conversion_result);
        });
    }
  }, [fromCurrency, toCurrency, amount]);

  // Save favorite pair
  const handleSaveFavorite = () => {
    const pair = `${fromCurrency}/${toCurrency}`;
    if (!favorites.includes(pair)) setFavorites([...favorites, pair]);
  };

  // Add alert
  const handleAddAlert = () => {
    const target = prompt("Enter target rate:");
    if (target) {
      setAlerts([
        ...alerts,
        {
          pair: `${fromCurrency}/${toCurrency}`,
          targetRate: parseFloat(target),
        },
      ]);
    }
  };

  // Check alerts
  useEffect(() => {
    alerts.forEach((alert) => {
      if (
        alert.pair === `${fromCurrency}/${toCurrency}` &&
        rate >= alert.targetRate
      ) {
        window.alert(`🚨 Alert: ${alert.pair} reached target rate!`);
      }
    });
  }, [rate, alerts, fromCurrency, toCurrency]);

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-center">
          💱 Currency Converter
        </h1>

        <div className="grid grid-cols-2 gap-4">
          <CurrencySelector
            value={fromCurrency}
            setValue={setFromCurrency}
            currencies={currencies}
          />
          <CurrencySelector
            value={toCurrency}
            setValue={setToCurrency}
            currencies={currencies}
          />
        </div>

        <AmountInput amount={amount} setAmount={setAmount} />

        <ConversionResult
          converted={converted}
          rate={rate}
          from={fromCurrency}
          to={toCurrency}
        />

        <div className="flex gap-4">
          <button
            onClick={handleSaveFavorite}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            ⭐ Save Favorite
          </button>
          <button
            onClick={handleAddAlert}
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            📢 Add Alert
          </button>
        </div>

        <Favorites favorites={favorites} />
        <Alerts alerts={alerts} />
        <HistoryChart from={fromCurrency} to={toCurrency} />
      </div>
    </div>
  );
}
