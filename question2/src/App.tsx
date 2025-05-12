import React, { useState } from 'react';
import { Container, Tabs, Tab } from '@mui/material';
import StockChart from './components/StockChart';
import CorrelationHeatmap from './components/CorrelationHeatmap';
import TimeSelector from './components/TimeSelector';

function App() {
  const [minutes, setMinutes] = useState(30);
  const [tab, setTab] = useState(0);

  return (
    <Container>
      <h2>📈 Stock Price Viewer</h2>
      <Tabs value={tab} onChange={(_, newVal) => setTab(newVal)}>
        <Tab label="Stock Chart" />
        <Tab label="Correlation Heatmap" />
      </Tabs>

      <TimeSelector minutes={minutes} setMinutes={setMinutes} />

      {tab === 0 && <StockChart ticker="NVDA" minutes={minutes} />}
      {tab === 1 && <CorrelationHeatmap minutes={minutes} />}
    </Container>
  );
}

export default App;
