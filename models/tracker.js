var mongoose = require('mongoose')
   ,Schema = mongoose.Schema
   ,ObjectId = Schema.ObjectId;

var trackerSchema = new Schema({
    ownerId: ObjectId,
    createdDate: {type: Date, default: Date.now},
    trackerKey : String,
    name: String,
    location: Schema.Types.Mixed
});

module.exports = mongoose.model('Tracker', trackerSchema);