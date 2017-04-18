var express = require('express')
, mongoose = require('mongoose')
, app = module.exports = express()
, cors = require('cors')
, bodyParser = require('body-parser')
, methodOverride = require('method-override')

, env = process.env.NODE_ENV || 'development'
, config = require('./config')[env]

var jwt    = require('jsonwebtoken');
var port = Number(process.env.PORT || 3000);

// connect to Mongo when the app initializes
mongoose.connect(config.db);

app.use(bodyParser.urlencoded({
	extended: true
}));

app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'))

app.use(cors());

var userApi = require('./controllers/user.js');
var sensorLogApi = require('./controllers/sensorLog.js');
var deviceApi = require('./controllers/device.js');

app.post('/user', userApi.createUser);
app.get('/user', userApi.getAllUsers);
app.get('/user/:userId/devices', deviceApi.getDeviceByUser);

app.post('/history', sensorLogApi.createLog);
app.get('/history/:deviceId', sensorLogApi.getLogByDeviceId);
app.get('/history/', sensorLogApi.getAllLogs);

app.post('/device', deviceApi.createDevice);
app.get('/device/:deviceId', deviceApi.getDeviceById);
app.get('/device/', deviceApi.getAllDevices);
app.put('/device/:deviceId', deviceApi.updateDeviceById);
app.delete('/device/:deviceId', deviceApi.deleteDeviceById);

var server = app.listen(port, function() {
	console.log("Express server listening on port %d", server.address().port);
});