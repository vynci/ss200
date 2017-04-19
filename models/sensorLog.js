var mongoose = require('mongoose')
   ,Schema = mongoose.Schema
   ,ObjectId = Schema.ObjectId;

var sensorLogSchema = new Schema({
    userId: String,
    timestamp: {type: Date, default: Date.now},
    deviceId : String,
    data: String
});

module.exports = mongoose.model('SensorLog', sensorLogSchema);