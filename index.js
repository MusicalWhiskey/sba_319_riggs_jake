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
import Artist from './models/Artist.js';
import Post from './models/Post.js';
import User from './models/User.js';

// Turning off auto indexing for production environments
mongoose.set("autoIndex", false)
// const newUser = new User({
//     name: "CoolCoolCool CoolCool",
//     email: "CoolCoolCool@Cool.Cool",
//     password: "4206911",
//     username: "CoolCoolCool"
//   })
  
  // RUN THIS LINE OF CODE IN ORDER FOR LINES 27-34 TO WORK 
//   await newUser.save()
  
  // ==========================================
  // Using the custom instance method
//   console.log(newUser.sayHello())
  
  // Using the custom static method
  const user = await User.getByUsername("CoolCoolCool")
  console.log(`Found user by username: `, user.username)

// Homepage
app.get('/', (req, res) => {
    console.log('Root route hit!');
    res.send(`Welcome to Jake's Jukebox! Click <a href="/artists">-->HERE<--</a> to see the artists in my current playlist. Also, feel free to make an account, and recommend some artists that you think I'd enjoy listening to by leaving a post! I've may even add your artist to my Jukebox!`);   
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

// Get all users
app.get('/users', async (req, res) => {
    try {
      const users = await User.find({});
      res.status(200).json(users)
    } catch (err) {
      res.send(err).status(400)
    }
  });
  
  // Get User by ID
  app.get('/users/:id', async (req, res) => {
    try {
      const user = await User.findById(req.params.id)
      res.status(200).json(user)
    } catch (err) {
      res.send(err).status(400)
    }
  })
  
  
  // Create User
  app.post('/users', async (req, res) => {
    try {
    //   Instance methods
      const user = new User(req.body)
      await user.validate()
      await user.save()
      res.status(201).json(user)
    } catch (err) {
      res.send(err).status(400)
    }
  })
  
  // Update User
  app.put('/users/:id', async (req, res) => {
    try {   
      const user = await User.findById(req.params.id)
      user.name = req.body.name || user.name
      user.email = req.body.email || user.email
      user.password = req.body.password || user.password
      user.username = req.body.username || user.username
      await user.save()
      res.status(200).json(user)
    } catch (err) {
      res.send(err).status(400)
    }
  })
  
  // Delete User
  app.delete('/users/:id', async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id)
      res.status(200).json(user)
    } catch (err) {
      res.send(err).status(400)
    }
  })
  

  // Get User posts
app.get('/users/:id/posts', async (req, res) => {
    try {
      const user = await User.findById(req.params.id).populate("posts")
      res.status(200).json(user)
    } catch (err) {
      res.send(err).status(400)
    }
  })
  
  
  // Create a post 
  app.post("/posts/:userId", async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      if (!user) {
        res.status(400).send("No user with that ID");
        return
      }
      const post = new Post(req.body)
      post.userId = user._id
  
      user.posts.push(post._id)
  
      await post.save();
      await user.save();
  
      res.status(201).json(post)
    } catch (err) {
      res.send(err).status(400)
    }
  })

// Middleware and routes will go here


app.listen(PORT, () => {
    console.log(`Effit. We'll do it live on PORT ${PORT}`);
});