var mongoose = require('mongoose')
   ,Schema = mongoose.Schema
   ,ObjectId = Schema.ObjectId;

var dashboardSchema = new Schema({
    userId: String,
    createdDate: {type: Date, default: Date.now},
    description : String,
    name: String
});

module.exports = mongoose.model('Dashboard', dashboardSchema);