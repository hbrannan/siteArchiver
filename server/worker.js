const Job = require('cron').CronJob;
const request = require('request');
const db = require('../database/connection');
const workerUtils = require('./workerUtils');

//https://www.npmjs.com/package/cron
/* `Seconds: 0-59, Minutes: 0-59, Hours: 0-23,
 Day of Month: 1-31, Months: 0-11, Day of Week: 0-6`*/
/* This function is run as the job */
/* This function is executed when the job stops */
/* Start the job right now */
/* Time zone of this job. */

//TODO: initialize on load

/*     *     *     *     *     *     *     *     *     *     *     *     */

exports.archiveSites = new Job('5 * * * * *', function() {
  return workerUtils.pullFromQueue();
}, null, true, 'America/Los_Angeles');

exports.updateTopFive = new Job(
  '* 5 * * * *',
  workerUtils.getTopFiveSites(),
  null,
  true
);
