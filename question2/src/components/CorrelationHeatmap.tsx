import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { HeatmapChart } from '@mui/x-charts/HeatmapChart';
import axios from 'axios';

const CorrelationHeatmap = ({ minutes }: { minutes: number }) => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/stocks/correlations?minutes=${minutes}`)
      .then((res) => {
        setData(res.data); 
      });
  }, [minutes]);

  if (!data) return <Typography>Loading heatmap...</Typography>;

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Correlation Heatmap (Last {minutes} min)
      </Typography>
      <HeatmapChart
        xAxis={[{ id: 'x', data: data.labels }]}
        yAxis={[{ id: 'y', data: data.labels }]}
        series={[{ data: data.values }]}
        height={500}
        width={700}
      />
    </Box>
  );
};

export default CorrelationHeatmap;
