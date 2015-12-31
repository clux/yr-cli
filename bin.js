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
var fs = require('fs');
var cfg = require(cfgPath);
if (!cfg.cacheFile) {
  throw new Error('.yrcli.json must specify a cacheFile');
}

cfg.cacheFile = cfg.cacheFile.replace(/~|\$HOME/, process.env.HOME);
if (!fs.existsSync(cfg.cacheFile)) {
  fs.writeFileSync(cfg.cacheFile, '{}');
}
var cache = require(cfg.cacheFile);

require('co')(function *() {
  var data = yield yr(argv, cfg, cache);
  console.log(JSON.stringify(data, null, 2));
  fs.writeFileSync(cfg.cacheFile, JSON.stringify(cache, null, 2)); // update cache
}).catch((err) => {
  console.error(err);
  process.exit(1);
});
