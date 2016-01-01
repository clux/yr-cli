# yr-cli
[![npm status](http://img.shields.io/npm/v/yr-cli.svg)](https://www.npmjs.org/package/yr-cli)
[![build status](https://secure.travis-ci.org/clux/yr-cli.svg)](http://travis-ci.org/clux/yr-cli)
[![dependency status](https://david-dm.org/clux/yr-cli.svg)](https://david-dm.org/clux/yr-cli)
[![coverage status](http://img.shields.io/coveralls/clux/yr-cli.svg)](https://coveralls.io/r/clux/yr-cli)

Terminal json weather reports via the [weather api](http://api.met.no/weatherapi/locationforecast/1.9/documentation) from [yr.no](http://www.yr.no).

## Usage
Create your `.yrcli.json` containing your location like in the [example](./.yrcli.json)

```bash
yr # now
yr -h 16 # at 16:00
yr -d 1 -h 12 # tomorrow at 12:00
yr -f # 5 day forecast
```

Output is json. For quick usage you can pipe to [json](https://npmjs.org/package/json):

```bash
yr | json rain # amount of rain for the next hour
yr -f | json -a temperature # temperatures for next 5 days
```

## Units
Here is an example output object annotated with the standard metric units (because we just return numbers):

```js
{
  "from": "2015-12-31T15:00:00Z",
  "to": "2015-12-31T16:00:00Z",
  "rain": 0.7, // millimeters
  "cloudiness": 100, // percent
  "humidity": 95.5, // percent
  "temperature": 4.1, // celcius
  "wind": {
    "speed": 5.2, // meters per second
    "direction": 181 // degrees in direction of compass, e.g. 180 is straight south.
  }
}
```

The dates are UTC JSON date strings you can `Date.parse()`.

## Caching
In accordance with yr.no usage policies, data is cached for 10 minutes in the `cacheFile` specified in your config.

## Installation

```bash
$ npm install yr-cli -g
```

## License
MIT-Licensed. See LICENSE file for details.
