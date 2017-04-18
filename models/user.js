var mongoose = require('mongoose')
   ,Schema = mongoose.Schema
   ,ObjectId = Schema.ObjectId;

var userSchema = new Schema({
    createdDate: {type: Date, default: Date.now},
    username: String,
    email: String,
    password: { type: String, required: true },
});

module.exports = mongoose.model('User', userSchema);