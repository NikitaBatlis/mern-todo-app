// In this file, you will create all the code needed to perform CRUD operations using Mongoose. */
const User = require('../models/user.model.js');
const mongoose = require('mongoose');

//Find and LOAD users todo list from MongoDB
exports.findUser = function(req, res) {
    const id = req.user._id
    User.findById(id, function(err, user) {
        if (err) {
            console.log(err);
            res.status(500).send({ message: "Some error occurred while retrieving User data." });
        } else {
            res.send(user);
        }
    });
}

//Find and ADD item to todolist
exports.updateToDo = function(req, res) {
    console.log(req.body);

    const id = req.body._id;
    const todolist = req.body.todolist;

    User.findByIdAndUpdate({_id:id}, {todolist: todolist}, {new: true}, function(err, doc) {
        if (err) {
            console.log("Something wrong when adding to-do list item!");
            res.send("ERROR: Not Updated. " + err);
        }
        res.send(doc);
        console.log('Todo item added to server')
    });
} 

