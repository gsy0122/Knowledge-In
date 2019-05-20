const mongoose = require('mongoose');

const {
  url,
  user,
  pass,
} = require('./../../config/database');

module.exports = () => {
  mongoose.Promise = global.Promise;
  mongoose.connect(url, {
    useCreateIndex: true,
		useNewUrlParser: true,
		user,
    pass,
  });
	
  mongoose.connection.on('error', console.error.bind(console, 'mongoose connection error.'));
  mongoose.connection.on('open', () => {
    console.log('connected db');
  });
  mongoose.connection.on('disconnected', () => {
    console.log('disconnected db');
  });
};