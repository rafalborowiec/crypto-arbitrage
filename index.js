require('dotenv').config();
const { fetchPrices, calculateArbitrage } = require('./services/exchange');
const { executeFlashLoan } = require('./services/blockchain');

(async () => {
  try {
    const prices = await fetchPrices(['ETH', 'BTC']);
    const arbitrageOpportunity = calculateArbitrage(prices);

    if (arbitrageOpportunity) {
      console.log('Arbitrage found:', arbitrageOpportunity);
      await executeFlashLoan(arbitrageOpportunity);
    } else {
      console.log('No arbitrage opportunity found.');
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
})();

// const http = require('http');

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello Rafal, Node.js!');
// });

// server.listen(3000, () => {
//   console.log('Server running at http://localhost:3000/');
// });