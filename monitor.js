var request = require('request');

module.exports = function monitor (room, log) {
  setInterval(function () {
    request({
      url: 'http://monitor.waytohealth.org',
      json: true
    }, function (err, res, body) {
      room.speak(body)
    });
  }, 180000)
};
