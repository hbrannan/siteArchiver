const request = require('request');
const db = require('../database/connection');

/*T. O. C

 *Handle HTML Fetch Queue
    -pullFromQueue
    _fetchURL
    _fetchHTML
    _addHTML
    _shift off of Queue

  *Fetch Top 5 Sites

*/

//Fetch the id and siteId from the taskQueue -> fetchURL()
//If no site remains in TaskQueue, return out with msg {task: null}
exports.pullFromQueue = () => {
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
  const defaultHtml = encodeURI('<html><body><div>Requested site unavailable.</div></body></html>')
  url = `http://${url}`
  return new Promise ((resolve, reject) => {
    return request({
      url: url,
      method: 'GET',
      timeout: 5000
      }, function (error, response) {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      })
  })
  .then((response, body) => {
    return response.statusCode === 200 ? addHtml(defaultHtml, site_id, task_id) : addHtml(response.body, site_id, task_id)
  })
  .catch( err => addHtml(defaultHtml, site_id, task_id) );
};

//Add the html value to the Site -> shiftOffQueue()
const addHtml = (html, site_id, task_id) => {
  return db.Site.findOne({
    where: {
      id: site_id
    }
  })
  .then(site => {
    return site.update({ html: html });
  })
  .then((site) => {
    return shiftOffQueue(task_id)
  })
  .catch(err => err);
};

//Delete Task from TaskQueue
const shiftOffQueue = (task_id) => {
  return db.Task.findOne({
      where: {
        id : task_id
      }
  })
  .then((task) => task.destroy())
  .then(deletedTask => {
    return deletedTask.siteId;
  })
  .catch(err => {console.log('destruction err'); return err});
};


/*     *     *     *     *     *     *     *     *     *     *     *     */


//Retrieve Top 5-hit Sites
exports.getTopFiveSites = () => {
  return db.Site.findAll({
    limit: 5,
    order: [
      ['hitCount', 'DESC']
    ]
  })
  .then((sites) => {
    let html = [];
    sites.forEach((site)=> { html.push({url: site.url, html: site.html, hits: site.hitCount}) });
    return html;
  })
  .catch(err => {
    console.log('err is', err)
    return err
  });
};
