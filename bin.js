#!/usr/bin/env node
var yr = require('.');
var argv = require('yargs')
  .boolean('forecast')
  .alias('f', 'Forecast for next 5 days')
  .option('days', {
    alias: 'd',
    describe: 'Forecast for d days from now',
  })
  .option('h', {
    alias: 'h',
    describe: 'Hour number for forecast (00-24)',
  })
  .argv;

if (argv.t != null && !Number.isInteger(argv.t)) {
  console.error('t must be an integer');
  process.exit(1);
}

var cfgPath = require('confortable')('.yrcli.json', process.cwd());
if (!cfgPath) {
  throw new Error('.yrcli.json not found');
}
var cfg = require(cfgPath);

require('co')(function *() {
  var data = yield yr(argv, cfg);
  console.log(JSON.stringify(data));
}).catch((err) => {
  console.error(err);
  process.exit(1);
});
