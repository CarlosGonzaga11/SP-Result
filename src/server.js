// server.js
const express = require('express');
const fetch = require('node-fetch');

const app = express();
const PORT = 3001; // Pode ser qualquer porta não usada

app.use(express.json());

// Rota que vai encaminhar as requisições para a API externa
app.get('/api/games', async (req, res) => {
  try {
    const response = await fetch('https://v1.basketball.api-sports.io/games?date=2025-03-11', {
      headers: {
        'x-apisports-key': 'f53e0bc5df3ac0465eec27df3e2d4caa',
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: 'Failed to fetch data' });
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
