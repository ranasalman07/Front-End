import React, { useState } from 'react';
import './App.css'

const CurrencyConverter = () => {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [convertedValue, setConvertedValue] = useState(null);
  const [error, setError] = useState('');

  const currencies = ['USD', 'EUR', 'GBP', 'INR', 'JPY', 'PKR'];

  // Mock API call
  const fetchConversionRate = async (from, to) => {
    // Simulate an API call delay
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (from === to) {
          resolve(1);
        } else {
          const mockRates = {
            USD: { EUR: 0.85, GBP: 0.75, INR: 74, JPY: 110 },
            EUR: { USD: 1.18, GBP: 0.88, INR: 87, JPY: 129 },
            GBP: { USD: 1.34, EUR: 1.14, INR: 101, JPY: 148 },
            INR: { USD: 0.013, EUR: 0.011, GBP: 0.0099, JPY: 1.46 },
            JPY: { USD: 0.0091, EUR: 0.0078, GBP: 0.0068, INR: 0.68 },
            PKR: { USD: 0.005, EUR: 0.0043, GBP: 0.0038, INR: 0.37, JPY: 0.83 }
          };

          const rate = mockRates[from]?.[to];
          if (rate) {
            resolve(rate);
          } else {
            reject(new Error('Conversion rate not available'));
          }
        }
      }, 1000);
    });
  };

  const handleConvert = async () => {
    setError('');
    setConvertedValue(null);

    if (!amount || isNaN(amount) || amount <= 0) {
      setError('Please enter a valid amount.');
      return;
    }

    try {
      const rate = await fetchConversionRate(fromCurrency, toCurrency);
      setConvertedValue((amount * rate).toFixed(2));
    } catch (err) {
      setError('Failed to fetch conversion rate.');
    }
  };

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4">Currency Converter</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Amount</label>
          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-2 border rounded-lg"
            placeholder="Enter amount"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">From</label>
          <select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
            className="w-full p-2 border rounded-lg"
          >
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">To</label>
          <select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
            className="w-full p-2 border rounded-lg"
          >
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center justify-between mb-4">
          <button
            onClick={handleSwap}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Swap Currencies
          </button>
          <button
            onClick={handleConvert}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
          >
            Convert
          </button>
        </div>

        {error && <p className="text-red-500 font-medium">{error}</p>}

        {convertedValue && (
          <p className="text-green-600 font-bold text-xl mt-4">
            Converted Value: {convertedValue} {toCurrency}
          </p>
        )}
      </div>
    </div>
  );
};

export default CurrencyConverter;
