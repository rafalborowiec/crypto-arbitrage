const axios = require('axios');

const fetchPrices = async (symbols) => {
  const apiKey = process.env.EXCHANGE_API_KEY;
  const prices = {};

  for (const symbol of symbols) {
    const response = await axios.get(`https://api.exchange.com/ticker/${symbol}`, {
      headers: { Authorization: `Bearer ${apiKey}` },
    });
    prices[symbol] = response.data.price;
  }

  return prices;
};

const calculateArbitrage = (prices) => {
  const [ETH, BTC] = [prices.ETH, prices.BTC];
  const profitMargin = BTC - ETH * 0.98; // Example calculation

  if (profitMargin > 0) {
    return { buy: 'ETH', sell: 'BTC', profitMargin };
  }
  return null;
};

module.exports = { fetchPrices, calculateArbitrage };