const db = require('../database/connection');

// if site exists: call addToHitCount... return site
//  else site !exist: add it as site & task.
const checkForSite = (targetUrl) => {
  console.log('checking db for site', targetUrl)
  return db.Site.findOne({
    where: {
      url : targetUrl
    }
  })
  .then(site => {
    if (site) {
      console.log('should incr hit count');
      return increaseHitCount(site.id);
    } else {
      return site;
    }
  })
  .catch(err => err);
};

// add as a new site, & call new task
//TODO: refactor 24-27 as per:
  //http://docs.sequelizejs.com/manual/tutorial/associations.html#foreign-keys
const addNewSite = (targetUrl) => {
  console.log('calling addNewSite');
  return db.Site.create({
    url: targetUrl,
    hitCount: 0
  })
  .then((site) => {
    return addNewTask(site.dataValues.id)
  })
  .catch((err) => err);
};

//add a new task
const addNewTask = (site_id) => {
  console.log('adding task')
  return db.Task.create({
    site_id: site_id
  })
  .then((site) => {
    return site;
  })
  .catch((err) => err);
};

//get site by id, and increase its hit count
const increaseHitCount = (site_id) => {
  console.log('incr call')
  return db.Site.findOne({ where: {
    id: site_id
  }})
  .then((site) => {
    site.hitCount +=1;
    return site.save();
  })
  .then(site => {
    console.log('site hit count', site.hitCount);
    return site;
  })
  .catch(err => err);
};

module.exports = {
  checkForSite: checkForSite,
  addNewSite: addNewSite,
  increaseHitCount: increaseHitCount
};
