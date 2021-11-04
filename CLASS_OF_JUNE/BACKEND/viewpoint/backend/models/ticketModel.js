const mongoose = require('mongoose');

const ticketSchema = mongoose.Schema({
	movieID: String,
	title: String,
	name: String,
	email: String,
	cost: Number,
	numOfTickets: Number,
	total: Number,
	status: String,
	created: String,
	txid: String,
	amount: String,
	ip: String,
	paymenttype: String,
	amount: Number,
	qrcode: String,
	date: { type: Date, default: Date.now },
});

const Ticket = mongoose.model('ticket', ticketSchema)

module.exports = Ticket;