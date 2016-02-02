var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/welcome', function(req, res){
	var MongoClient = mongodb.MongoClient;

	var url = 'mongodb://root:bw121992@172.24.100.133:27017/it';

	MongoClient.connect(url, function(err, db) {
		if (err) {
			console.log('Unable to connect to the database', err);
		} else {
			console.log('Connection Established...');

			var collection = db.collection('cca');

			collection.find({}).toArray(function(err, result) {
				if (err) {
					res.send(err);
				} else if (result.length) {
					res.render('cca', {
						"cca" : result
					});
				} else {
					res.send('No documents found');
				}

				db.close();
			});
		}
	});
});

router.get('/newemployee', function(req, res) {
	res.render('newemployee', {title: 'Add Employee'});
});

router.post('/addemployee', function(req, res) {
	var MongoClient = mongodb.MongoClient;

	var url = 'mongodb://root:bw121992@172.24.100.133:27017/it';

	MongoClient.connect(url, function(err, db) {
		if (err) {
			console.log('Unable to connect to the database', err);
		} else {
			console.log('Connection Established...');


			var collection = db.collection('cca');

			var employee1 = {name: {fname: req.body.fname, lname: req.body.lname},
				email: {work: req.body.email},
				phone: {work: req.body.phone}};

			collection.insert([employee1], function(err, result) {
				if (err) {
					console.log(err);
				} else {
					res.redirect('welcome');
				}

				db.close();
			});
		}
	});
});

module.exports = router;
