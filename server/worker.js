const cron = require('cron').CronJob;
const request = require('request');
const db = require('../database/connection');
const utils = require('./utils');

//pull from queue
  // if nothing to pull, stop
  // else ->
const pullFromQueue = () => {

  //note: do this in batches?

  // get lowest id,
  // find site w/ that site idx
  // request html
  // addHtml()
};

//const
exports.fetchHTML = (url, task_id, site_id) => {
  return new Promise ((resolve, reject) => {
    request(`http://${url}`, (error, response, body) => {
      if (error) {
        reject(error);
      } else {
        resolve(response, body);
      }
    })
  })
  .then((data) => {
    console.log('succ. fetch', data)
    //check status code:
    //if ok
    addHtml(site_id, data.body, task_id)
    return data.body;
    //else: send back 404 for message
  })
  .catch( err => {
    return {'error': {type: 'fetchHTML', err: err}}
  });
};

//http://docs.sequelizejs.com/manual/tutorial/instances.html#updating-saving-persisting-an-instance
const addHtml = (siteId, html, taskId) => {
    // db.Site.findOne({
    //   where: {id: siteId}
    // })
    // .then( (data) {
    //     console.log(data;)
    //     //site.update({
    //     //   html: html
    //     //})
    //     //update HTML
    //     //shiftOffQueue(site.id)
    // })
    // .catch(err => err);
  // store html at siteId
  // shiftOffQueu
};

//http://docs.sequelizejs.com/manual/tutorial/instances.html#destroying-deleting-persistent-instances
const shiftOffQueue =  () => {
   //join query
    // db.Task.findOne({
    //     where: {siteI}
    // })
      //return task_id
    // }).then (task_id {
    //     //task.destroy()
    // })
    // .catch(err => err);
};

const pullTopFive = () => {

};

//https://www.npmjs.com/package/cron
/* `Seconds: 0-59, Minutes: 0-59, Hours: 0-23,
 Day of Month: 1-31, Months: 0-11, Day of Week: 0-6`*/
/* This function is run as the job */
/* This function is executed when the job stops */
/* Start the job right now */
/* Time zone of this job. */

//initialize these at App onMount()? index.js?

exports.archiveSites = new cron(
  '10 * * * * *',
  pullFromQueue(),
  () => {
    console.log('pull completed');
  },
  true
);

exports.updateTopFive = new cron(
  '10 * * * * *',
  pullTopFive(),
  () => {
    console.log('pull completed');
  },
  true
);
