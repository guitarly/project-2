var mongoose = require('mongoose');
var Tasks = require('./task.js');

/*user schema*/
var userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    tasks: [Tasks.schema] // schema is lower case
});

/*user model*/
var User = mongoose.model('User', userSchema);
module.exports = User;
