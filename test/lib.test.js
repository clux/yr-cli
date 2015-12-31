var yr = require('..')
  , test = require('bandage');

var cfg = {
  location: {
    lat: 58.4822,
    lon: 8.7825
  },
};

var verifyObject = function (t, o) {
  t.eq(Object.keys(o), [
    'from',
    'to',
    'rain',
    'cloudiness',
    'humidity',
    'temperature',
    'wind'],
    'desired keys present'
  );
  t.ok(Date.parse(o.from), 'from json parsable date format');
  t.ok(Date.parse(o.to), 'to json parsable date format');
  t.ok(Number.isFinite(o.temperature), 'temperature float');
  t.ok(Number.isFinite(o.humidity), 'humidity float');
  t.ok(Number.isFinite(o.cloudiness), 'cloudiness float');
  t.ok(Number.isFinite(o.rain), 'rain float');
  t.ok(Number.isFinite(o.wind.speed), 'wind.speed float');
  t.ok(Number.isFinite(o.wind.direction), 'wind.direction float');
};


test('current', function *(t) {
  var curr = yield yr({}, cfg);
  verifyObject(t, curr);
  t.ok(Date.parse(curr.to) < Date.now() + 3600*1000, 'to date at most 1h in future');
  t.ok(Date.parse(curr.from) + 3600*1000 > Date.now(), 'from date at most 1h in past');
});

test('future', function *(t) {
  // future day and specific hour
  var fut = yield yr({ d: 5, h: 19 }, cfg);
  verifyObject(t, fut);
  t.ok(Date.parse(fut.to) < Date.now() + 6*24*3600*1000, 'to date at most 6d in future');
  t.ok(Date.parse(fut.from) > Date.now() + 4*24*3600*1000, 'from date at least 4d in past');

  // verify that it also takes into account hour number
  var exp = new Date(Date.now());
  exp.setHours(19);
  exp.setMinutes(0);
  exp.setSeconds(0);
  exp = new Date(1000*3600*24*5 + exp.valueOf());

  t.ok(Date.parse(fut.from) <= exp, 'from date is <= the desired start date');
  t.ok(Date.parse(fut.to) >= exp, 'to date is >= the desired start date');
});

test('5day', function *(t) {
  // 5 day forecast
  var forecast = yield yr({f: true}, cfg);
  t.instance(forecast, Array, 'array forecast');
  t.eq(forecast.length, 5, '5 days');
  forecast.forEach(verifyObject.bind(null, t));
});
