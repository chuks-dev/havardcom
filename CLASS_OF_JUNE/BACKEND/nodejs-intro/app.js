const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json()); // allows express to evaluate json request
app.use(cors()); // allow cors

mongoose
	.connect('mongodb://localhost:27017/myblog')
	.then(() => {
		console.log('db connected successfully');
	})
	.catch(err => {
		console.log('There was an error connecting to db ==>' + err);
	});

const authorSchema = mongoose.Schema({
	name: String,
	age: Number,
});

const Author = mongoose.model('author', authorSchema);

const rachael = new Author({
	name: 'Rachael',
	age: 19,
});

// rachael
// 	.save()
// 	.then(res => {
// 		console.log('data saved successfully');
// 	})
// 	.catch(err => {
// 		console.log('There was an error saving data');
// 	});

// index route
app.get('/', (req, res) => {
	res.json({ message: 'You have reached our home route' });
});

app.get('/authors', (req, res) => {
	Author.find({})
		.then(response => {
			res.json(response);
		})
		.catch(err => {
			console.log(err);
		});
});

app.post('/new-author', (req, res) => {
	let newAuthor = new Author({
		name: req.body.name,
		age: req.body.age,
	});

	newAuthor
		.save()
		.then(result => {
			res.json('Author saved successfully');
		})
		.catch(err => {
			res.json(err);
		});
});

app.post('/author', (req, res) => {
	Author.findById(req.body.authorId)
		.then(response => {
			res.json(response);
		})
		.catch(err => {
			console.log(err);
		});
});

app.post('/update-author', (req, res) => {
	Author.findByIdAndUpdate(req.body.authorId, {
		name: req.body.name,
		age: req.body.age,
	})
		.then(response => {
			res.json('item updated successfully');
		})
		.catch(err => {
			console.log(err);
		});
});

// root route
app.get('*', (req, res) => {
	res.json('The route you are looing for does not exist');
});

const PORT = 3000;

app.listen(PORT, () => {
	console.log(`Server started at port ${PORT}`);
});
