//User Mongoose Schema
const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
	
	username: {
		type: String,
		required: true
	},
	googleID: {
		type: String,
		required: true
	},
	todolist: []
});

let User = mongoose.model('todo-users', UserSchema);

module.exports = User;

