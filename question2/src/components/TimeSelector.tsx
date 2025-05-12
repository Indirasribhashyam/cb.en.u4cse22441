import { Box, MenuItem, Select, Typography } from '@mui/material';
import React from 'react';

const intervals = [10, 30, 50, 60];

interface Props {
  minutes: number;
  setMinutes: (m: number) => void;
}

const TimeSelector: React.FC<Props> = ({ minutes, setMinutes }) => {
  return (
    <Box sx={{ marginBottom: 2 }}>
      <Typography>Select Time Interval (minutes):</Typography>
      <Select
        value={minutes}
        onChange={(e) => setMinutes(Number(e.target.value))}
        sx={{ minWidth: 120 }}
      >
        {intervals.map((int) => (
          <MenuItem key={int} value={int}>
            {int}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
};

export default TimeSelector;
