require('dotenv').config();

const express = require('express');
const { Pool } = require('pg');
const app = express();
app.use(express.json());

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
  });

pool.connect()
  .then(() => console.log('Connected to the SQL'))
  .catch(() => console.error('Did NOT connect to SQL', err));

app.post('/add-score', async (req, res) => {
  const { name, score } = req.body;
  try {
    const result = await pool.query("INSERT INTO scores (name, score) VALUES ($1, $2) RETURNING *", [name, score]);
    res.json(result.rows[0]);
  }
  catch (err) {
    res.status(500).send(err.message);
  }
});

app.get('/leaderboard', async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM scores ORDER BY score DESC LIMIT 10");
    res.json(result.rows);
  }
  catch (err) {
    res.status(500).send(err.message);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => { //port either in my env file or 3000
  console.log('Server is running, port ${PORT}');
});