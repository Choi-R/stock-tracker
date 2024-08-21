require('dotenv').config()
const express = require('express');

const app = express();
app.use(express.json());

// Routes
//const router = require('./src/routes')
//app.use('/api/v1', router);
app.get('/', (req, res) => {
    res.send('Welcome to the Stock Tracker API!');
  });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
