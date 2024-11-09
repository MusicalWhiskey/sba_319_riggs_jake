const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();
const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.ATLAS_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Middleware and routes will go here

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Effit. We'll do it live on PORT ${PORT}`);
});