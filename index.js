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
var dashboardApi = require('./controllers/dashboard.js');
var widgetApi = require('./controllers/widget.js');

app.post('/v1/api/user', userApi.createUser);
app.get('/v1/api/user', userApi.getAllUsers);
app.get('/v1/api/user/:userId/devices', deviceApi.getDeviceByUser);

app.post('/v1/api/history', sensorLogApi.createLog);
app.get('/v1/api/history/:deviceId', sensorLogApi.getLogByDeviceId);
app.get('/v1/api/history', sensorLogApi.getAllLogs);

app.post('/v1/api/device', deviceApi.createDevice);
app.get('/v1/api/device/:deviceId', deviceApi.getDeviceById);
app.get('/v1/api/device/', deviceApi.getAllDevices);
app.put('/v1/api/device/:deviceId', deviceApi.updateDeviceById);
app.delete('/v1/api/device/:deviceId', deviceApi.deleteDeviceById);

app.post('/v1/api/dashboard', dashboardApi.createDashboard);
app.get('/v1/api/dashboard/:id', dashboardApi.getDashboardById);
app.get('/v1/api/dashboard/', dashboardApi.getAllDashboards);
app.put('/v1/api/dashboard/:dashboardId', dashboardApi.updateDashboardById);
app.delete('/v1/api/dashboard/:dashboardId', dashboardApi.deleteDashboardById);

app.post('/v1/api/widget', widgetApi.createWidget);
app.get('/v1/api/widget/:dashboardId', widgetApi.getWidgetByDashboardId);
app.get('/v1/api/widget/', widgetApi.getAllWidgets);
app.put('/v1/api/widget/:widgetId', widgetApi.updateWidgetById);
app.delete('/v1/api/widget/:widgetId', widgetApi.deleteWidgetById);

var server = app.listen(port, function() {
	console.log("Express server listening on port %d", server.address().port);
});