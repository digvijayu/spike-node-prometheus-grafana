const express = require('express');
const promClient = require('prom-client');

const app = express();

const PORT = process.env.PORT || 3000;

const register = new promClient.Registry();
promClient.collectDefaultMetrics({ register });

const Histogram = promClient.Histogram;
const requestDuration = new Histogram({
  name: 'http_request_duration_seconds',
  help: 'request duration histogram',
  labelNames: ['handler', 'method', 'statuscode'],
  buckets: [0.5, 10, 25, 50, 100, 250, 500, 1000, 2500, 5000, 10000],
  // buckets: [0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1, 2.5, 5, 10],
});

// Register the histogram
register.registerMetric(requestDuration)

app.get('/health', (req, res) => {
  const healthCheck = {
    uptime: process.uptime(),
    message: 'OK',
    timestamp: Date.now()
  };

  const response = ``;

  try {
    res.json(healthCheck).send();
  }
  catch (error) {
    healthCheck.message = error;
    res.status(503).send();
  }
});

app.get('/metrics', async (req, res) => {
  try {
      res.set('Content-Type', register.contentType);
      res.end(await register.metrics());
  } catch (ex) {
      res.status(500).end(ex);
  }
});

app.listen(PORT, () => {
  console.log(`updated1`);
  console.log(`Node app started on port: ${PORT}`);
});