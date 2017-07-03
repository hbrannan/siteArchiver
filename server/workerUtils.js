const request = require('request')
const db = require('../database/connection')
const queuePath = `http://localhost:${process.env.JOB_PORT}`

/*  T. O. C

 *Handle HTML Fetch Queue
    -pullFromQueue
    _fetchURL
    _fetchHTML
    _addHTML
    _shift off of Queue

  *Fetch Top 5 Sites

*/

//Fetch the id(INT) and siteId(INT) from the taskQueue
//params: n/a
//succ: -> fetchURL(siteId, taskId)  || noTaskExists -> return {task: null}
//fail: return error
exports.pullFromQueue = () => {
  return new Promise ((resolve, reject) => {
    return request({
      url: `${queuePath}/task`,
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
  .then(res => {
    const task = JSON.parse(res.body)
    return task.siteId ? fetchURL(task.siteId, task.id) : { task: null };
  })
  .catch((err) => err);
};

//Retrieve URL to fetch HTML
//params: target site_id (INT.req), task_id(INT.req)
//succ: -> fetchHTML(site_id, task_id)
//fail: return error
const fetchURL = (site_id, task_id) => {
  return db.Site.findOne({
    where: {
      id: site_id
    }
  })
  .then((siteInQueue) => fetchHTML(siteInQueue.url, site_id, task_id))
  .catch(err => err)
};

//Retrieve HTML, handle _all_ possible returns
//params: url(STRING.req), target site_id(INT.req), task_id(INT.req)
//succ: -> 200 addHTML(retrievedHTML site_id, task_id) || addHTML(defaultHTML, site_id, task_id)
//fail: addHTML(defaultHTML, site_id, task_id)
const fetchHTML = (url, site_id, task_id) => {
  const defaultHtml = encodeURI('<html><body><div>Requested site unavailable.</div></body></html>')
  url = `http://${url}`
  const strTest = '<script>console.log=function(){};</script>'

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
    return response.statusCode === 200 ? addHtml(`${strTest} ${response.body}`, site_id, task_id) : addHtml(defaultHtml, site_id, task_id)
  })
  .catch( err => addHtml(defaultHtml, site_id, task_id) );
};

//Add HTML to site instance
//params: html(STRING.req), target site_id(INT.req), task_id(INT.req)
//succ: -> updateSite.then(shiftOffQueu(task_id))
//fail: return err, STOP (retry later)
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

//Shift task off of queue
//params: task_id(INT.req)
//succ: -> destroyTaskInstance.then(return corresponding siteId)
//fail: return err, (retry later)
const shiftOffQueue = (task_id) => {
  const body = JSON.stringify({task_id: task_id})

  return new Promise ((resolve, reject) => {
    return request({
      url: `${queuePath}/task`,
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: body,
      timeout: 5000
      }, function (error, response) {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      })
  })
  .then(res => {
    const deletedTask = JSON.parse(res.body);
    return deletedTask.siteId
  })
  .catch(err => err);
};


/*     *     *     *     *     *     *     *     *     *     *     *     */


//Retrieve Top 5-hit Sites
//params: n/a
//succ: -> return Array[<Obj>] with .url[STRING], .html[STRING], .hits[INT]
//fail: return error
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
  .catch(err => err);
};
