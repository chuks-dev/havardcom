const mongoose = require('mongoose');


const connectDB = mongoose
	.connect('mongodb://localhost:27017/viewpoint')
	.then(() => console.log('database connected successfully'))
	.catch(err => console(err));

module.exports = connectDB;