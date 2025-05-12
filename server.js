const express = require('express');
const stockRoutes = require('./routes/stocks');

const app = express();
const PORT = 3001;

app.use('/stocks', stockRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
