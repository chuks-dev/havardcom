const nodemailer = require('nodemailer');
const Keys = require('./keys')

let transporter = nodemailer.createTransport({
	host: 'smtp.hostinger.com',
	port: 465,
	secure: true,
	auth: Keys.transporterAuth,
});

module.exports = transporter;