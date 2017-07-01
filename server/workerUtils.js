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
    console.log(task.id, 't a s k    i d   a t be gi n n i n g')
    return task.id ? fetchURL(task.siteId, task.id) : { task: null };
  })
  .catch((err) =>  err);
};

//Given target site_id, return site url -> fetchHTML()
const fetchURL = (site_id, task_id) => {
  console.log('fetchURL', site_id, task_id)
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
  console.log('calling fetch', url)
  return new Promise ((resolve, reject) => {
    return request(`http://${url}`, (error, response, body) => {
      if (error) {
         return reject(error);
      } else {
         return resolve(response, body);
      }
    })
  })
  .then((response, body) => {
    console.log('succ. fetch', response.statusCode, site_id, task_id)
    //TODO check status code:
    // if (data.statusCode === 200) {
    //   console.log('F E T C H D A T A', data.body.toString())
    // }// todo: could make more robust
    console.log(response.html, response.body)
    return addHtml(response.body, site_id, task_id)
    //else: send back 404 for message
  })
  .catch( err => {
    console.log('error in f e t c h    h t  m  l ')
    return {'error': {type: 'fetchHTML', err: err}}
  });
};

//Add the html value to the Site -> shiftOffQueue()
const addHtml = (html, site_id, task_id) => {
  console.log('calling addHTML', site_id, task_id)
  return db.Site.findOne({
    where: {
      id: site_id
    }
  })
  .then(site => {
    console.log('calling addHTML, s i t e    d o e s    e x  i s t ')
    return site.update({ html: html });
  })
  .then((site) => {
    console.log('t r y n a   s h i  f  t')
    return shiftOffQueue(site.id)
  })
  .catch(err => {
    console.log('e r r i n   a d d    h t m l', html, site_id, task_id)
    return err
  });
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
    console.log(' t a s k     t o    de s t r ')
    return task.destroy();
  })
  .catch(err => {console.log('destruction err'); return err});
};


/*     *     *     *     *     *     *     *     *     *     *     *     */


//Retrieve Top 5-hit Sites
exports.getTopFiveSites = () => {
  console.log('c a l l i n g   g e t    t o p   fi v e ')
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
    console.log('sites at top 5 are ', sites)
    return sites;
  })
  .catch(err => err);
};
