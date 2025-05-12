const express = require('express');
const router = express.Router();
const stockService = require('../services/stockService');
const { calculateCorrelation } = require('../utils/correlation');

router.get('/:ticker', async (req, res) => {
    const ticker = req.params.ticker;
    const minutes = parseInt(req.query.minutes);
    const aggregation = req.query.aggregation;

    if (aggregation !== 'average') return res.status(400).json({ error: 'Only average supported' });

    const { prices, average } = await stockService.getAveragePrice(ticker, minutes);
    res.json({
        averageStockPrice: average,
        priceHistory: prices
    });
});

// GET correlation between two stock tickers
router.get('/stockcorrelation', async (req, res) => {
    const minutes = parseInt(req.query.minutes);
    const tickers = req.query.ticker;

    if (!Array.isArray(tickers) || tickers.length !== 2) {
        return res.status(400).json({ error: 'Provide exactly two tickers as query parameters.' });
    }

    const [ticker1, ticker2] = tickers;
    const stock1 = await stockService.getAveragePrice(ticker1, minutes);
    const stock2 = await stockService.getAveragePrice(ticker2, minutes);

    const correlation = calculateCorrelation(
        stock1.prices.map(p => p.price),
        stock2.prices.map(p => p.price)
    );

    res.json({
        correlation: correlation,
        stocks: {
            [ticker1]: {
                averagePrice: stock1.average,
                priceHistory: stock1.prices
            },
            [ticker2]: {
                averagePrice: stock2.average,
                priceHistory: stock2.prices
            }
        }
    });
});

module.exports = router;

