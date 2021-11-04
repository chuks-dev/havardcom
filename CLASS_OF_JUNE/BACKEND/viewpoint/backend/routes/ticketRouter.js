const router = require('express').Router();
const axios = require('axios');
const QRcode = require('qrcode');
const cloudinary = require('cloudinary').v2;
const path = require('path');

// Import Configs
const cloudinaryConfig = require('../config/cloudinaryConfig.js');
const Keys = require('../config/keys.js');

// Import Utils
const composeEmail = require('../utils/composeEmail.js');
const transporter = require('../config/transporter.js');

const Ticket = require('../models/ticketModel.js');

// This route create a ticket
router.post('/create-ticket', (req, res) => {
	const newTicket = new Ticket(req.body);

	newTicket
		.save()
		.then(ticket => {
			const { name, email, cost, numOfTickets, _id } = ticket;

			let movieDetails = {
				name,
				customer_email: email,
				customer_number: '08026491645',
				cost,
				numOfTickets,
				currency: 'NGN',
				amount: cost * numOfTickets,
				redirect_url: 'http://localhost:3000/validate-payment', //redirect to validate-payment route
				txref: _id,
				PBFPubKey: Keys.PBFPubKey,
			};

			// make api request to flutterwave with the above data as body
			axios({
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				data: movieDetails,
				url: 'https://api.ravepay.co/flwv3-pug/getpaidx/api/v2/hosted/pay',
			})
				.then(response => {
					res.json(response.data); //send data back to frontend
				})
				.catch(err => console.log(err));
		})
		.catch(err => {
			res.json(err);
		});
});

// This route gets hit by flutterwave at end of transaction
router.post('/validate-payment', (req, res) => {
	const { txref, cancelled } = req.query; //txref gets passed as a query by flutterwave

	if (cancelled) {
		res.sendFile(path.join(__dirname, `../views/cancelled.html`));
		return;
	}

	// Make api call to validete payment
	axios({
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer {SEC_KEY}',
		},
		url: 'https://api.ravepay.co/flwv3-pug/getpaidx/api/v2/verify',
		data: {
			txref,
			SECKEY: Keys.SECKEY,
		},
	})
		.then(response => {
			//get extra information from flutterwave
			const { txref, txid, status, created, paymenttype, ip, amount } =
				response.data.data;

                console.log(response.data)

			if (response.data.status === 'success') {
				// Generate QRcode
				QRcode.toFile(path.join(__dirname, `../qrcodes/${txref}.png`), `http://localhost:3000/check-ticket/${txref}`)
					.then(() => {
						// Upload QRCode to cloudinary
						cloudinary.uploader
							.upload(path.join(__dirname, `../qrcodes/${txref}.png`))
							.then(result => {
								//update  ticket details if payment (extra info from flutterwave and qrcode from cloudindary)
								Ticket.findByIdAndUpdate(txref, {
									created,
									txref,
									txid,
									status,
									created,
									paymenttype,
									ip,
									amount,
									qrcode: result.url,
								})
									.then(result => {
										const { _id } = result;

										// Get updated ticket details that contains flutterwave data and qrcode
										Ticket.findById(_id)
											.then(ticket => {
												const {name, email, amount, qrcode, numOfTickets, title, _id} = ticket;

												//Send email to Customer
												transporter
													.sendMail({
														from: 'viewpoint@chuksdev.com', // our address
														to: `${email}`, // list of receivers
														subject: `Hello ${name} here is your Moive Ticket ✔`, // Subject line
														text: `Dear ${name}, Your Payment was successfull`, // plain text body
														html: composeEmail(name, title, numOfTickets, amount, _id, qrcode), // html body
													})
													.then(info => {
														console.log('email sent');
													})
													.catch(err => console.log(err));
											})
											.catch(err => console.log(err));
									})
									.catch(err => console.error(err));
							})
							.catch(err => console.log(err));
					})
					.catch(err => console.log(err));

				//sends html that in turn redirect user to frontend successful payment page
				res.sendFile(path.join(__dirname, `../views/success.html`));
			} else {
                // if else runs, then payment wasn't successfull
				//sends html that in turn redirect user to frontend failed payment page
				res.sendFile(path.join(__dirname, `../views/failed.html`));
			}
		})
		.catch(err => console.log(err));
});

router.get('/check-ticket/:id', (req, res) => {
    Ticket.findById(req.params.id)
    .then(ticket =>{
		const {name,title,numOfTickets,amount,_id,qrcode} = ticket;
        res.send(composeEmail(name, title, numOfTickets, amount, _id, qrcode));
    })
    .catch(err => {
		console.log(err)
        res.send('Cannot get ticket')
    })
})

module.exports = router;
