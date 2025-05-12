const axios = require('axios');
const correlationUtil = require('../utils/correlation');

const BASE_URL = 'http://20.244.56.144/evaluation-service/stocks';

async function getStockData(ticker, minutes) {
  const url = `${BASE_URL}/${ticker}?minutes=${minutes}`;
  const response = await axios.get(url);
  return response.data;
}

async function getAveragePrice(ticker, minutes) {
  const data = await getStockData(ticker, minutes);
  const prices = data.map(entry => entry.price);
  const average = prices.reduce((sum, price) => sum + price, 0) / prices.length;

  return {
    averageStockPrice: average,
    priceHistory: data
  };
}

async function getCorrelation(ticker1, ticker2, minutes) {
  const data1 = await getStockData(ticker1, minutes);
  const data2 = await getStockData(ticker2, minutes);

  const prices1 = data1.map(entry => entry.price);
  const prices2 = data2.map(entry => entry.price);

  const correlation = correlationUtil.computeCorrelation(prices1, prices2);

  return {
    correlation,
    stocks: {
      [ticker1]: {
        averagePrice: prices1.reduce((sum, price) => sum + price, 0) / prices1.length,
        priceHistory: data1
      },
      [ticker2]: {
        averagePrice: prices2.reduce((sum, price) => sum + price, 0) / prices2.length,
        priceHistory: data2
      }
    }
  };
}

module.exports = {
  getAveragePrice,
  getCorrelation
};

const stockData = {
    NVDA: [],
    PYPL: [],
};

Object.keys(stockData).forEach(ticker => {
    stockData[ticker].push({
        price: parseFloat((Math.random() * 1000).toFixed(5)),
        lastUpdatedAt: new Date().toISOString()
    });
});
setInterval(() => {
    const now = new Date();
    Object.keys(stockData).forEach(ticker => {
        stockData[ticker].push({
            price: parseFloat((Math.random() * 1000).toFixed(5)),
            lastUpdatedAt: now.toISOString()
        });
    });
}, 1000);
function getRecentPrices(ticker, minutes) {
    const cutoff = Date.now() - minutes * 60 * 1000;
    return (stockData[ticker] || []).filter(p =>
        new Date(p.lastUpdatedAt).getTime() >= cutoff
    );
}

async function getAveragePrice(ticker, minutes) {
    const prices = getRecentPrices(ticker, minutes);
    const average = prices.reduce((sum, p) => sum + p.price, 0) / (prices.length || 1);
    return { prices, average };
}

module.exports = {
    getAveragePrice
};
