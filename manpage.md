# yr(1)
Return a local weather forecast using the weather api from yr.no

## SYNOPSIS

`yr [OPTION]...`

## DESCRIPTION
Fetches a weather forecast for a location specified in `.yrcli.json` in, or above the current directory. Requests are cached for 10 minutes.

## OPTIONS

`-h hour`      Specific hour for the forecast in 24 hour format

`-d offset`    Offset forecast by d days

`-f`           Return a 5 day forecast

## OUTPUT
The output format is in the following `JSON` format:

```
{
  "from": "2015-12-31T15:00:00Z",
  "to": "2015-12-31T16:00:00Z",
  "rain": 0.7,        // millimeters
  "cloudiness": 100,  // percent
  "humidity": 95.5,   // percent
  "temperature": 4.1, // celcius
  "wind": {
    "speed": 5.2,     // meters per second
    "direction": 181  // degrees in direction of compass, e.g. 180 is straight south.
  }
}
```

When the five day forecast is requested, the output is an array of above objects.

## CONFIG
A valid config can be placed in `~/.yrcli.json`

```
{
  "location": {
    // london
    "lat": 51.5072,
    "lon": 0.1275
  },
  "cacheFile": "~/.yrdata.json"
}
```

## INSTALLATION
Install globally through npm

`npm install -g yr-cli`

## BUGS
Please report bugs [at](https://github.com/clux/yr-cli/issues)
