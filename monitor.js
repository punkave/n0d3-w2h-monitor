var request = require('request');

var sites = {};
var happyNews = [
  'Oh joyful joyousness, everyone!',
  'Everyone, it\'s a Xmas miracle!',
  'Good job, everyone!'
];
var sadNews = [
  'Uh oh spaggetios, everyone.',
  'Everyone, I have bad news, and I have bad news.',
  'Everyone, I am just the messenger.'
];

module.exports = function monitor (room, log) {
  setInterval(function () {
    request({
      url: 'http://monitor.waytohealth.org',
      json: true
    }, function (err, res, body) {
      body.forEach(function (site) {
        var news;
        if (sites[site.slug] === undefined) {
          sites[site.slug] = true;
          return;
        }
        if (sites[site.slug] != site.ok) {
          if (site.ok) {
            news = randomSelect(happyNews);
          } else {
            news = randomSelect(sadNews);
          }
          room.speak('*** ' + news + ' ' + site.name + ' (' + site.url + ') is ' + (site.ok ? 'UP' : 'DOWN') + ' ***')
          sites[site.slug] = site.ok;
        }
      })
    });
  }, 180000)
};

function randomSelect(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
