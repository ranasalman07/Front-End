import React, { useState, useEffect } from 'react';
import './App.css';

const CurrencyConverter = () => {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [convertedValue, setConvertedValue] = useState(null);
  const [error, setError] = useState('');
  const [currencies, setCurrencies] = useState([]);

  // Fetch currency list from API
  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await fetch(
          'https://open.er-api.com/v6/latest/USD' // Example API endpoint
        );
        const data = await response.json();
        if (data && data.rates) {
          setCurrencies(Object.keys(data.rates));
        } else {
          setError('Failed to load currencies.');
        }
      } catch (err) {
        setError('Error fetching currencies.');
      }
    };

    fetchCurrencies();
  }, []);

  // Fetch conversion rate from API
  const fetchConversionRate = async (from, to) => {
    try {
      const response = await fetch(
        `https://open.er-api.com/v6/latest/${from}` // Example API endpoint
      );
      const data = await response.json();
      if (data && data.rates && data.rates[to]) {
        return data.rates[to];
      } else {
        throw new Error('Conversion rate not available.');
      }
    } catch {
      throw new Error('Failed to fetch conversion rate.');
    }
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
      setError(err.message);
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
