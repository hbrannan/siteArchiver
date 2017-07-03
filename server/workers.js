const Job = require('cron').CronJob;
const request = require('request');
const db = require('../database/connection');
const workerUtils = require('./workerUtils');

/*   T O C

Archive Sites
 - Every 5 seconds, check Queue for Task.
 - If task, fetch html, store it, shift task

Update Top Five
 - Every 5 min, query Sites for highest hit count
 - return top 5 to browser.

 */


exports.archiveSites = new Job('05 * * * * *', function() {
  return workerUtils.pullFromQueue();
}, null, true, 'America/Los_Angeles');


//TODO: socket.io / http stream webhook for topFiveUpdate
// exports.updateTopFive = new Job(
//   '* 5 * * * *',
//   workerUtils.getTopFiveSites(),
//   null,
//   true
// );



/*  C R O N    S I G N A T U R E
ref : https://www.npmjs.com/package/cron
Params:
String: `Sec:0-59, Min:0-59, Hours:0-23, DayOfMonth:1-31, Month:0-11, DayOfWeek:0-6`
Fn: function that is run as the job
Fn: function executed when job stops
Bool: Start the job right now
String: e.g., 'America/Los_Angeles' : Time zone of this job.
*/
