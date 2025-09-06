export default function ConversionResult({ converted, rate, from, to }) {
  return (
    <div className="p-4 bg-gray-100 rounded text-center dark:bg-gray-800 dark:text-white">
      {converted ? (
        <>
          <p className="text-xl font-bold">{converted.toFixed(2)} {to}</p>
          <p className="text-sm">Rate: 1 {from} = {rate.toFixed(4)} {to}</p>
        </>
      ) : (
        <p>Enter amount to convert</p>
      )}
    </div>
  );
}
