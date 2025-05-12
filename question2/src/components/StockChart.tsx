import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart } from '@mui/x-charts/LineChart';
import { Box, Typography } from '@mui/material';

interface StockChartProps {
  ticker: string;
  minutes: number;
}

const StockChart: React.FC<StockChartProps> = ({ ticker, minutes }) => {
  const [prices, setPrices] = useState<{ x: number; y: number }[]>([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/stocks/${ticker}?minutes=${minutes}&aggregation=average`)
      .then((res) => {
        const data = res.data.priceHistory.map((p: any) => ({
          x: new Date(p.lastUpdatedAt).getTime(),
          y: p.price,
        }));
        setPrices(data);
      });
  }, [ticker, minutes]);

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Stock Prices for {ticker} (Last {minutes} min)
      </Typography>
      <LineChart
        xAxis={[{ dataKey: 'x', scaleType: 'time', label: 'Time' }]}
        series={[{ dataKey: 'y', label: ticker }]}
        data={prices}
        width={700}
        height={400}
      />
    </Box>
  );
};

export default StockChart;
