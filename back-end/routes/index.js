var express = require('express');
var router = express.Router();
//include the mongoose module
var mongoose = require('mongoose');
//Set up the mongourl that we will connect to. 
// Mongo listens on 27017, the path is the db we will use
var mongoUrl = "mongodb://localhost:27017/searchApp";
//Include our students model. It is a mongoose model so it will 
// automatically use the db that mongoose connects to 
var Student = require('../models/students');
// Conncet mongoose to the mongoUrl. Now our student model, is connected
// to mongo, using the collection we specified int he model
mongoose.connect(mongoUrl);

//Set up an endpoint (route) for apps to get all students
router.get('/getStudents', function(req, res, next){
	//Use the student object (mongoose model - connected to mongo)
	//To run a query.
	Student.find({}, function(error, documents){
		// if mongoose returns an error (such as can't connect)
		// our program will halt here
		if(error){
			// print off the error
			res.json(error);
		}else{
			// if there is no error, then print off the result of the query
			res.json(documents);
		}
	});
});

// Make a route for someone to add a new student
router.post('/addStudent', function(req, res, next){
	//Set up a var for the variable "name" passed from a form
	//req.body is the object that contains all variables passed from a form
	var studentName = req.body.name;
	// Same with gender
	var studentGender = req.body.gender;
	// Create a new Student object. This will be in the likeness of the student model/schema
	var studentToAdd = new Student({
		name: studentName,
		gender: studentGender
	});
	// Save the student to mongodb
	studentToAdd.save();
	// Let the requester know that we added the student
	res.json({message: "added"});
});

module.exports = router;

