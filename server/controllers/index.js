'use strict';


/**
 * A map of all controllers. Requiring `controllers` will connect you to all controllers in the directory.
 * @type {Object}
 */
module.exports = {
  user: require('./user-controller'),
  friend: require('./friend-controller'),
  event: require('./event-controller')
};
