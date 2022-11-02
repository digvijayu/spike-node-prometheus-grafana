const express = require('express');

const app = express();

const PORT = process.env.PORT || 3000;

app.get('/health', (req, res) => {
  const healthCheck = {
    uptime: process.uptime(),
    message: 'OK',
    timestamp: Date.now()
  };

  try {
    res.json(healthCheck).send();
  }
  catch (error) {
    healthCheck.message = error;
    res.status(503).send();
  }
});

app.listen(PORT, () => {
  console.log(`Node app started on port: ${PORT}`);
});