// proxy-server.js
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const app = express();
const PORT = 3001;

app.use(cors());  // Autorise toutes origines

app.get('/api/getContact/:userId', async (req, res) => {
  const userId = req.params.userId;
  const apiUrl = `https://zheko-sandbox.saas.imagino.com/ucdapi/get_MasterContact/2/Single_Customer_View/${userId}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Proxy error' });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server listening on :${PORT}`);
});
