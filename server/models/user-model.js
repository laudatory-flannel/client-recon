var queryString = require('../../db/psql/index.js');
var db = require('../../db');
var _ = require('lodash');

// Non standard passing to conform to Google signin
exports.addOne = function (userArr, callback) {
	db.query(queryString.addOneUser, userArr)
	.then(function (result) {
		callback(null, result);
	})
	.catch(function (err) {
		callback(err, null);
	});
};

exports.getOne = function (userId, callback) {
	db.query(queryString.getOneUser, userId)
	.then(function (result) {
		callback(null, result);
	})
	.catch(function (err) {
		callback(err, null);
	});
};