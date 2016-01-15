'use strict';

var sqlLoad = require('sql-load');
var path = require('path');
/**
 * This is a directory of all the SQL strings that are used by the database.
 * To add a Query, create a sql file in the `psql/` directory and then require it
 * in the module.exports object of this file.
 * @type {Object}
 */
module.exports = {
  addOneUser: sqlLoad(path.join(__dirname, './addOneUser.sql')),
  getOneUser: sqlLoad(path.join(__dirname, './getOneUser.sql')),
  addOneFriend: sqlLoad(path.join(__dirname, './addOneFriend.sql')),
  getAllFriendsForUser: sqlLoad(path.join(__dirname, './getAllFriendsForUser.sql')),
  getOneFriend: sqlLoad(path.join(__dirname, './getOneFriend.sql')),
  updateOneFriend: sqlLoad(path.join(__dirname, './updateOneFriend.sql')),
};

