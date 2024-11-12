import 'dotenv/config'
import express from 'express';
import mongoose from 'mongoose';

// Load environment variables from .env file
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.ATLAS_URI)
    .then(() => console.log('Mongoose is connected'))
    .catch(err => console.error('MongoDB connection error:', err));

//Pulling in Artist Model
import Artist from './models/artist.js';
// Turning off auto indexing for production environments
mongoose.set("autoIndex", false)

// Indexes
// Artist.index({artistName: "text", bestAlbum: "text", genre: "text"})

// Homepage
app.get('/', (req, res) => {
    console.log('Root route hit!');
    res.send(`Welcome to Jake's Jukebox! Click <a href="/artists">-->HERE<--</a> to see the artists in my current playlist. Also, feel free to add some artists that you think I'd enjoy listening to!`);   
});

//Get all artists
app.get('/artists', async (req, res) => {
    const artists = await Artist.find();
    res.json(artists);
});

//Get artist by ID
app.get('/artists/:id', async (req, res) => {
    const artist = await Artist.findById(req.params.id);
    res.json(artist);
});

//Create a new artist
app.post('/artists', async (req, res) => {
    const artist = new Artist(req.body);
    await artist.save();
    res.json(artist);
});

//Update an artist
app.put('/artists/:id', async (req, res) => {
    const artist = await Artist.findById(req.params.id);
    artist.artistName = req.body.artistName;
    artist.yearFounded = req.body.yearFounded;
    artist.bestAlbum = req.body.bestAlbum;
    artist.genre = req.body.genre;
    await artist.save();
    res.json(artist);
});

//Delete an artist
app.delete('/artists/:id', async (req, res) => {
    const artist = await Artist.findByIdAndDelete(req.params.id);
    res.json(artist);
});

// Middleware and routes will go here


app.listen(PORT, () => {
    console.log(`Effit. We'll do it live on PORT ${PORT}`);
});