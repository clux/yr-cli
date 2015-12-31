var hash = require('hash-object');
var yr = require('yr.no-forecast');
const API_VERSION = 1.9;

module.exports = function (argv, cfg, cache) {
  cache = cache || {};
  var parseObject = function (obj) {
    return {
      from: obj.from,
      to: obj.to,
      rain: parseFloat(obj.rain),
      cloudiness: parseFloat(obj.cloudiness),
      humidity: parseFloat(obj.humidity),
      temperature: parseFloat(obj.temperature),
      wind: {
        speed: parseFloat(obj.windSpeed.mps),
        direction: parseFloat(obj.windDirection.deg)
      }
    };
  };
  var uid = hash({argv, cfg});

  return new Promise((resolve, reject) => {
    var cleanUpData = function (err, data) {
      if (err) { return reject(err); }

      var d = Array.isArray(data) ?
        data.map(parseObject):
        parseObject(data);

      // cache results here when we got valid results
      if (!cache[uid]) {
        cache[uid] = { data: d, time: Date.now() };
      }

      resolve(d);
    };

    // if in cache - avoid querying
    if (uid in cache) {
      if (Date.now() < cache[uid].time + 10*60*1000) {
        return resolve(cache[uid].data);
      }
      delete cache[uid]; // cache too old - cleanup
    }

    yr.getWeather(cfg.location, function (err, location) {
      if (argv.f) {
        location.getFiveDaySummary(cleanUpData);
      }
      else {
        var time = new Date();
        if (Number.isInteger(argv.d)) {
          // set d days in the future
          time.setDate(time.getDate() + argv.d);
        }
        if (Number.isInteger(argv.h)) {
          // set hour number for set day
          time.setHours(argv.h);
        }
        location.getForecastForTime(time, cleanUpData);
      }
    }, [API_VERSION]);
  });
};
