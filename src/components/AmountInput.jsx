export default function AmountInput({ amount, setAmount }) {
  return (
    <input
      type="number"
      value={amount}
      onChange={(e) => setAmount(e.target.value)}
      className="w-full border rounded p-2 dark:bg-gray-800 dark:text-white"
      placeholder="Enter amount"
    />
  );
}
