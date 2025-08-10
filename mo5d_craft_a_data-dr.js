const express = require('express');
const axios = require('axios');
const moment = require('moment');

const app = express();

// API Endpoints
const apiEndpoints = [
  {
    name: 'Users API',
    url: 'https://jsonplaceholder.typicode.com/users',
    method: 'GET',
    interval: 10000, // 10 seconds
  },
  {
    name: 'Posts API',
    url: 'https://jsonplaceholder.typicode.com/posts',
    method: 'GET',
    interval: 30000, // 30 seconds
  },
  {
    name: 'Weather API',
    url: 'https://api.openweathermap.org/data/2.5/weather',
    method: 'GET',
    interval: 60000, // 1 minute
    params: {
      q: 'London,UK',
      units: 'metric',
      appid: 'YOUR_API_KEY',
    },
  },
];

// API Service Monitor
async function monitorApi endpoint(apiEndpoint) {
  try {
    const startTime = moment();
    const response = await axios({
      method: apiEndpoint.method,
      url: apiEndpoint.url,
      params: apiEndpoint.params,
    });
    const endTime = moment();
    const latency = endTime.diff(startTime, 'milliseconds');
    console.log(`[${apiEndpoint.name}] API responded in ${latency}ms`);
  } catch (error) {
    console.log(`[${apiEndpoint.name}] API failed: ${error.message}`);
  }
}

// Schedule API Monitoring
apiEndpoints.forEach((apiEndpoint) => {
  setInterval(() => {
    monitorApiEndpoint(apiEndpoint);
  }, apiEndpoint.interval);
});

// Start API Service Monitor
app.listen(3000, () => {
  console.log('API Service Monitor started on port 3000');
});