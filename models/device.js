var mongoose = require('mongoose')
   ,Schema = mongoose.Schema
   ,ObjectId = Schema.ObjectId;

var deviceSchema = new Schema({
    userId: String,
    createdDate: {type: Date, default: Date.now},
    deviceId : String,
    name: String,
    data : String
});

module.exports = mongoose.model('Device', deviceSchema);