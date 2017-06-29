var mongoose = require('mongoose')
   ,Schema = mongoose.Schema
   ,ObjectId = Schema.ObjectId;

var widgetSchema = new Schema({
    dashboardId: String,
    createdDate: {type: Date, default: Date.now},
    cols: Number,
    rows: Number,
    x: Number,
    y: Number,
    backgroundColor: String
});

module.exports = mongoose.model('Widget', widgetSchema);