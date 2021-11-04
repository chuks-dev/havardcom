const mongoose = require('mongoose');


const movieSchema = mongoose.Schema({
    title:String,
    description:String,
    trailer:String,
    img:String,
    cost:Number,
    tags:[],
    featured:Boolean
});

const Movie = mongoose.model('movie',movieSchema);


module.exports = Movie;