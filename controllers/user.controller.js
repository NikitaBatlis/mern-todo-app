// /* In this file, you will create all the code needed to perform CRUD operations using Mongoose. */
const User = require('../models/user.model.js');
const mongoose = require('mongoose');

//Find and LOAD users todo list from MongoDB
exports.findOne = function(req, res) {
    User.findOne(function(err, user) {
        if (err) {
            console.log(err);
            res.status(500).send({ message: "Some error occurred while retrieving User data." });
        } else {
            res.send(user);
        }
    });
}

//Find and ADD item to todolist
exports.addToDo = function(req, res) {
    const id = req.body._id;
    const todolist = req.body.todolist;

    console.log(id);
    console.log(todolist)

    User.findByIdAndUpdate({_id:id}, {todolist: todolist}, {new: true}, function(err, doc) {
        if (err) {
            console.log("Something wrong when adding to-do list item!");
            res.send("ERROR: Not Updated. " + err);
        }
        res.send(doc);
    });
} 

//Find and REMOVE item from todolist.
exports.deleteToDo = function(req, res) {
    const id = req.body._id;
    const todolist = req.body.todolist;

    console.log(id);
    console.log(todolist)

    User.findByIdAndUpdate({_id:id}, {todolist: todolist }, { new: true }, function(err, doc) {
        if (err) {
            console.log("Something wrong when deleting to-do list item!");
            res.send("ERROR: Not deleted. " + err);
        }
        res.send(doc);
    });
}