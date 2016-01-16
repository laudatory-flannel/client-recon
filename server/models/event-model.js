var queryString = require('../../db/psql/index.js');
var db = require('../../db');
var _ = require('lodash');

// helper function
var callCallbackOnResults = function(promise, callback) {
  return promise
  .then(function(results) {
    callback(null, results);
  })
  .catch(function(err) {
    callback(err, null);
  });
};

// ---- Export functions ----
exports.addOne = function (friendId, eventObj, callback) {
  var queryParameters = [
    friendId,
    eventObj.name,
    eventObj.date
  ];

  var promise = db.query(queryString.addOneEvent, queryParameters);
  return callCallbackOnResults(promise, callback);
};

exports.getAllForFriend = function(friendId, callback) {
  var promise = db.query(queryString.getAllEventsForFriend, friendId)
  return callCallbackOnResults(promise, callback);
};

exports.getOne = function (eventId, callback) {
  var promise = db.query(queryString.getOneEvent, eventId)
  return callCallbackOnResults(promise, callback);
};

exports.updateOne = function (eventId, data, callback) {
  // take the data and make the SQL arguments
  var init = { columns: [], values: [] };
  var query = _.reduce(data, function(acc, val, key) {
    acc.columns.push(key);
    acc.values.push(val);
    return acc;
  }, init);

  // stringify the arguments
  var columns = query.columns.join(', ');
  var values = _.map(query.values, function(value) {
    if (value === null) {
      return "null";
    } else if (typeof value === 'string') {
      return "'" + value + "'";
    } else {
      return value;
    }
  }).join(', ');

  // console.log("COLUMNS:", columns);
  // console.log("VALUES:", values);

  // performe the db transaction
  var promise = db.query(queryString.updateOneEvent, [eventId, columns, values]);
  return callCallbackOnResults(promise, callback);
};

exports.deleteOne = function(eventId, callback) {
  var promise = db.query(queryString.deleteOneEvent, eventId);
  return callCallbackOnResults(promise, callback);
};