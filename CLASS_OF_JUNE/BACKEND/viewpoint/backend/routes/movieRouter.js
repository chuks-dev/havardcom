const router = require('express').Router();
const Movie = require('../models/movieModel.js');


router.get('/movies', (req, res) => {
	Movie.find({})
		.then(movies => {
			res.json(movies);
		})
		.catch(err => console.log(err));
});

router.get('/movie/:id', (req, res) => {
	Movie.findById(req.params.id)
		.then(movie => {
			res.json(movie);
		})
		.catch(err => console.log(err));
});

router.post('/add-movie', (req, res) => {
	let newMovie = new Movie(req.body);
	newMovie
		.save()
		.then(movie => res.status(201).json(movie))
		.catch(err => console.log(err));
});

router.post('/update-movie/:id', (req, res) => {
	Movie.findByIdAndUpdate(req.params.id, req.body)
		.then(movie => {
			res.status(201).json(movie);
		})
		.catch(err => {
			console.log(err);
			res.json(err);
		});
});

router.post('/delete-movie/:id', (req, res) => {
	Movie.findByIdAndDelete(req.params.id)
		.then(movie => {
			res.status(200).json('Movie Deleted');
		})
		.catch(err => {
			console.log(err);
			res.status(500).json(err);
		});
});

module.exports= router;
