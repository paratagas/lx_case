var appSettings = require('../settings');
var dbURI = appSettings.mongo.development.connectionString;
var mongoose = require('mongoose');
var options = {
    server: {
        socketOptions: { keepAlive: 1 }
    }
};
mongoose.connect(dbURI, options);

// CONNECTION EVENTS
mongoose.connection.on('connected', function() {
    console.log('Mongoose connected to ' + dbURI);
});
mongoose.connection.on('error', function(err) {
    console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function() {
    console.log('Mongoose disconnected');
});
