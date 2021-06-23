const express = require('express');
const mongoose = require('mongoose');
const app = express();

// set view engine
app.set('view engine', 'ejs');

// Use body parser
app.use(express.urlencoded({ extended: true }));

// set static public folder
app.use(express.static('public'));

// Connect mongoose to db
mongoose
	.connect('mongodb://localhost:27017/movienary', {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
	})
	.then(() => console.log('Connected to database'))
	.catch(err => console.log(err));

//Create movie schema
const movieSchema = mongoose.Schema({
	title: String,
	duration: String,
	image: String,
	genre: String,
	description: String,
});

//create movie model
const movie = mongoose.model('movie', movieSchema);

// ROUTES - starts here
app.get('/', (req, res) => {
	movie
		.find()
		.then(result => {
			res.render('home', { movies: result });
		})
		.catch(err => {
			console.log(err);
		});
});

// render add movie form
app.get('/add-movie', (req, res) => {
	res.render('add-movie');
});

// get a movie from db by ID
app.get('/movie/:id', (req, res) => {
	movie
		.findById(req.params.id)
		.then(result => {
			res.render('single-movie', { movie: result });
		})
		.catch(err => {
			console.log(err);
		});
});

//update movie
app.get('/update-movie/:id', (req, res) => {
	movie
		.findById(req.params.id)
		.then(result => {
			res.render('update-movie', { movie: result });
		})
		.catch(err => console.log(err));
});

//Add a post to db
app.post('/add-movie', (req, res) => {
	const newMovie = new movie(req.body);

	newMovie
		.save()
		.then(res => console.log(res))
		.catch(err => console.log(err));

	// add post to db
	res.redirect('/');
});

app.post('/update-movie', (req, res) => {
	const { title, duration, image, description, genre } = req.body;

	const updatedMovie = {
		title,
		duration,
		genre,
		image,
		description,
	};

	if (req.body.btn === 'update') {
		movie
			.findByIdAndUpdate(req.body.id, updatedMovie)
			.then(() => {
				res.redirect(`/movie/${req.body.id}`);
			})
			.catch(err => console.log(err));
	} else {
		movie
			.findByIdAndDelete(req.body.id)
			.then(() => {
				res.redirect('/');
			})
			.catch(err => console.log(err));
	}
});

// ROUTES -ends here

app.listen(5000, () => console.log('app start at http://localhost:5000'));
