export default function CurrencySelector({ value, setValue, currencies }) {
  return (
    <select
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="w-full border rounded p-2 dark:bg-gray-800 dark:text-white"
    >
      {currencies.map((cur) => (
        <option key={cur} value={cur}>
          {cur}
        </option>
      ))}
    </select>
  );
}
