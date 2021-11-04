const express = require('express');
const app = express();

// imported mongoose
const mongoose = require('mongoose');

// Connect mongoose to mongodb
mongoose
  .connect('mongodb://localhost:27017/music', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log('data base started successfully'))
  .catch(err => console.log(err));

//create a mongoose schema
const songSchema = mongoose.Schema({
  title: String,
  artist: String,
  trackNo: Number,
  isFeatured: Boolean,
  featuredArtist: [],
});

const song = mongoose.model('song', songSchema);

const NotAfraid = new song({
  title: 'Not Afraid',
  artist: 'Eminem',
  trackNo: 1,
  isFeatured: false,
  featuredArtist: [],
});

// NotAfraid.save()
//   .then(() => console.log('data added successfully'))
//   .catch(err => console.log(err));

//Routes
app.get('/', (req, res) => {
  res.send('You have reached the home route');
});

const artistSchema = mongoose.Schema({
  name: String,
  age: Number,
  album: [],
});

const artist = mongoose.model('artist', artistSchema);

// Find all data in a collection
// artist
//   .find()
//   .then(res => console.log(res))
//   .catch(err => console.log(err));

// Find specific data by id
// artist
//   .findById('60a4ecbab664504478859c74')
//   .then(res => console.log(res))
//   .catch(err => console.log(err));

// Find specific data by a property
// artist
//   .find({ age: { $lt: 60 } })
//   .then(res => console.log(res))
//   .catch(err => console.log(err));

// Update a data
// artist
//   .findOneAndUpdate({ _id: '60a4ecbab664504478859c74' }, { age: 25 })
//   .then(res => console.log(res))
//   .catch(err => console.log(err));

// Delete a data
// artist
//   .findOneAndDelete({ _id: '60a4ecbab664504478859c74' })
//   .then(() => console.log('data deleted'))
//   .catch(err => console.log(err));

app.listen(5000, () => {
  console.log('App started at port http://localhost:5000');
});
