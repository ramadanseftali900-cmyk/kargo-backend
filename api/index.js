const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Kargo API calisiyor!' });
});

app.post('/api/gonder', async (req, res) => {
  try {
    const { firma, apiUrl, apiKey, username, password, customerCode, shipment } = req.body;
    const response = await axios.post(apiUrl, {
      apiKey, username, password, customerCode, ...shipment
    });
    res.json({ success: true, firma, data: response.data });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});

module.exports = app;
