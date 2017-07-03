const db = require('../database/connection');

const checkForSiteAsTask = (targetId) => {
  return db.Site.findOne({
    where: {
      id : Number(targetId)
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
  return db.Task.create()
  .then((task) => {
    return task.setSite(site_id)
  })
  .then(tasksList => {
    return site_id;
  })
  .catch((err) => err);
};

//get site by id, and increase its hit count
const increaseHitCount = (site_id) => {
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
