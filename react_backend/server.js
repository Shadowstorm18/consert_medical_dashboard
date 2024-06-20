const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5001; // Changed to use a different port if 5000 is in use

app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/icudb');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define a schema
const userSchema = new mongoose.Schema({
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  age: { type: Number, required: true },
  height: { type: Number, required: true },
  weight: { type: Number, required: true },
  diagnosis: { type: String,required:true },
  do_not_adminster: { type: String,required:true },
  blood_type: { type: String,required:true },
  date_of_entry: {type: Date, required: true },
  apacheii: { type: Number, required: true },
  iss: { type: Number, required: true },
  ts: { type: Number, required: true },
  gcs: { type: Number, required: true },
});

const User = mongoose.model('User', userSchema);

// Create a new user (POST)
app.post('/api/users', async (req, res) => {
    const {
      userId,
      first_name,
      last_name,
      age,
      height,
      weight,
      diagnosis,
      do_not_adminster,
      blood_type,
      date_of_entry,
      apacheii,
      iss,
      ts,
      gcs,
    } = req.body;
    
    const user = new User({
      userId,
      first_name,
      last_name,
      age,
      height,
      weight,
      diagnosis,
      do_not_adminster,
      blood_type,
      date_of_entry,
      apacheii,
      iss,
      ts,
      gcs,
    });
    
    try {
      const savedUser = await user.save();
      res.json(savedUser);
    } catch (err) {
      res.status(400).send(err);
    }
  });
  
  // Read user data (GET)
  app.get('/api/users/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
      const user = await User.findOne({ userId }).populate('userId');
      if (!user) return res.status(404).send('User not found');
      res.json(user);
    } catch (err) {
      res.status(400).send(err);
    }
  });
  
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
