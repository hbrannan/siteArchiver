const db = require('../database/connection');
console.log('T A S K ', db.Task)

const checkForSiteAsTask = (targetId) => {
  console.log('check for site  A S   T A S K', targetId)
  return db.Site.findOne({
    where: {
      id : targetId
    }
  })
  .then(site => {
    if (site) {
      return increaseHitCount(site.id);
    } else {
      return site;
    }
  })
  .catch(err => err);
};

// site exists: call addToHitCount... return site
// else : add site as site &... as task.
const checkForSite = (targetUrl) => {
  console.log('checking db for site', targetUrl)
  return db.Site.findOne({
    where: {
      url : targetUrl
    }
  })
  .then(site => {
    if (site) {
      return increaseHitCount(site.id);
    } else {
      return site;
    }
  })
  .catch(err => err);
};

// add as a new site, & call new task
const addNewSite = (targetUrl) => {
  console.log('calling addNewSite');
  return db.Site.create({
    url: targetUrl,
    hitCount: 0
  })
  .then((site) => {
    return addNewTask(site.id);
  })
  .catch((err) => err);
};

//add a new task and set the site_id as a foreign key
const addNewTask = (site_id) => {
  console.log('adding task')
  return db.Task.create()
  .then((task) => {
    return task.setSite(site_id)
  })
  .catch((err) => err);
};

//get site by id, and increase its hit count
const increaseHitCount = (site_id) => {
  console.log('incr hit count')
  return db.Site.findOne({ where: {
    id: site_id
  }})
  .then((site) => {
    site.hitCount +=1;
    return site.save();
  })
  .catch(err => err);
};

module.exports = {
  checkForSite: checkForSite,
  addNewSite: addNewSite,
  increaseHitCount: increaseHitCount,
  checkForSiteAsTask: checkForSiteAsTask
};
