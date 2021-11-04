const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

//Import Configs
const connectDB = require('./config/db.js');


// Import routes
const movieRouter = require('./routes/movieRouter');
app.use(movieRouter);

const ticketRouter = require('./routes/ticketRouter');
app.use(ticketRouter);
const PORT = 3000;

app.listen(PORT, () => {
	console.log(`App Started at ${PORT}`);
});

