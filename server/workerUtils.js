const request = require('request');
const db = require('../database/connection');

/*
  *Handle HTML Fetch Queue
    -pull From Queue
    -fetchURL
    -fetchHTML
    -addHTML
    -shift off of Queue

  *Fetch Top 5 Sites
*/

//Fetch the id and siteId from the taskQueue -> fetchURL()
//If no site remains in TaskQueue, return out with msg {task: null}
exports.pullFromQueue = () => {
  console.log('pullFromQueue')
  return db.Task.findOne({
    attributes: [
      [db.sequelize.fn('min', db.sequelize.col('id')), 'id'],
      [db.sequelize.fn('min', db.sequelize.col('id')), 'siteId'],
    ]
  })
  .then((task) => {
    return task.id ? fetchURL(task.siteId, task.id) : { task: null };
  })
  .catch((err) =>  err);
};

//Given target site_id, return site url -> fetchHTML()
const fetchURL = (site_id, task_id) => {
  console.log('fetchURL')
  return db.Site.findOne({
    where: {
      id: site_id
    }
  })
  .then((siteInQueue) => {
    return fetchHTML(siteInQueue.url, site_id, task_id)
  })
  .catch(err => err)
};

//fetch HTML -> addHTML()
const fetchHTML = (url, site_id, task_id) => {
  console.log('calling fetch')
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
    console.log('succ. fetch', data.statusCode)
    //TODO check status code:
    //if OK,
    return addHtml(data.body, site_id, task_id)
    //else: send back 404 for message
  })
  .catch( err => {
    return {'error': {type: 'fetchHTML', err: err}}
  });
};

//Add the html value to the Site -> shiftOffQueue()
const addHtml = (html, site_id, task_id) => {
  console.log('calling addHTML')
  return db.Site.findOne({
    where: {
      id: site_id
    }
  })
  .then(site => {
    return site.update({ html: html });
  })
  .then((site) => {
    return shiftOffQueue(site.id)
  })
  .catch(err => err);
};

//Delete Task from TaskQueue
const shiftOffQueue = (site_id) => {
  console.log('calling shift off queue')
  return db.Task.findOne({
      where: {
        siteId : site_id
      }
  })
  .then((task) => {
    return task.destroy();
  })
  .catch(err => err);
};


/*     *     *     *     *     *     *     *     *     *     *     *     */


//Retrieve Top 5-hit Sites
exports.getTopFiveSites = () => {
  return db.Site.findAll({
    attributes: [
        [db.sequelize.fn('max', db.sequelize.col('hitCount')), 'html']
    ],
    order: [
      ['hitCount', 'DESC']
    ],
    limit: 5
  })
  .then((sites) => {
    return sites;
  })
  .catch(err => err);
};
