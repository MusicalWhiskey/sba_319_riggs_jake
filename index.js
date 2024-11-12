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
import Artist from './models/artist.js'

// Turning off auto indexing for production environments
mongoose.set("autoIndex", false)

// Indexes
// Artist.index({artistName: "text", bestAlbum: "text", genre: "text"})

// Homepage
app.get('/', (req, res) => {
    console.log('Root route hit!');
    res.send(`Welcome! Click <a href="/artists">here</a> to see the artists I listen to`);
});

// Get all Artists
app.get('/artists', async (req, res) => {
    const artists = await artist.find();
    res.json(artists);
  });

// Get a single Artist
app.get('/artists/:id', async (req, res) => {
    try {
        const artist = await artist.findById(req.params.id);
        if (artist == null) {
            return res.status(404).json({ message: 'Cannot find artist' });
        }
        res.json(artist);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
    
// Create a new Artist   
app.post('/artists', async (req, res) => {
    const artist = new artist(req.body);
    try {
        const newArtist = await artist.save();
        res.status(201).json(newArtist);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update an Artist
app.patch('/artists/:id', async (req, res) => {
    try {
        const artist = await artist.findById(req.params.id);
        if (artist == null) {
            return res.status(404).json({ message: 'Cannot find artist' });
        }
        if (req.body.artistName != null) {
            artist.artistName = req.body.artistName;
        }
        if (req.body.bestAlbum != null) {
            artist.bestAlbum = req.body.bestAlbum;
        }
        if (req.body.genre != null) {
            artist.genre = req.body.genre;
        }
        const updatedArtist = await artist.save();
        res.json(updatedArtist);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete an Artist
app.delete('/artists/:id', async (req, res) => {
    try {
        const artist = await artist.findById(req.params.id);
        if (artist == null) {
            return res.status(404).json({ message: 'Cannot find artist' });
        }
        await artist.remove();
        res.json({ message: 'Deleted Artist' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// Middleware and routes will go here


app.listen(PORT, () => {
    console.log(`Effit. We'll do it live on PORT ${PORT}`);
});