var request = require('request');

var sites = {};

module.exports = function monitor (room, log) {
  setInterval(function () {
    var timestamp = new Date();
    request({
      url: 'http://monitor.waytohealth.org',
      json: true
    }, function (err, res, body) {
      body.forEach(function (site) {
        if (sites[site.slug] === undefined) {
          sites[site.slug] = true;
          return;
        }
        if (sites[site.slug] != site.ok) {
          room.speak('everyone: ' + timestamp + (site.ok ? ' UP ' : ' DOWN ') + site.url);
          sites[site.slug] = site.ok;
        }
      })
    });
  }, 180000)
};

function randomSelect(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
