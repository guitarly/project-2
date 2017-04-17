var mongoose = require('mongoose');

/*photo schema*/
var taskSchema = mongoose.Schema({
    userid: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: String
});

/*photo model*/
var Task = mongoose.model('Task', taskSchema);
module.exports = Task;
