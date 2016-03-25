var express = require('express');
var router = express.Router();

router.use(function(req, res, next) {
	
	if (!req.isAuthenticated()) {
		res.redirect('/#login');
	}

	return next();
});

router.route('/cca')

	// returns all cca staff
	.get(function(req, res) {

		// to do
		res.send({message: 'TODO return all cca staff'});

	})

	.post(function(req, res){

		// to do
		res.send({message: 'TODO create a new employee'});

	});

router.route('/cca/:id')

	// returns a particular user
	.get(function(req, res){

		// to do
		res.send({message: 'TODO return employee with ID ' + req.params.id});

	})

	// update existing user
	.put(function(req, res){

		// to do
		res.send({message: 'TODO modify employee with ID ' + req.params.id});

	})

	// delete existing user
	.delete(function(req, res){

		// to do
		res.send({message: 'TODO delete employee with ID ' + req.params.id});

	});

module.exports = router;