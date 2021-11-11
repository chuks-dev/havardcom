const router = require('express').Router();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, path.join(__dirname, '../uploads'));
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + file.originalname);
	},
});


const upload = multer({storage});

router.post('/upload', upload.single('image'), (req, res) => {
	console.log(req.file);
	// console.log(req.body);

	// const newUpload = {	...req.body,path:req.file.path}
	// console.log(newUpload);
	res.json(req.file);
});


module.exports = router;
