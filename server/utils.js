const db = require('../database/connection');

//Check DB for Site given
//params: id(INT)
//succ: -> site exists increaseHitCount(site.id) || return null
//fail: return err
const checkForSiteById = (targetId) => {
  return db.Site.findOne({
    where: {
      id : Number(targetId)
    }
  })
  .then(site => site ? increaseHitCount(site.id) :  site)
  .catch(err => err);
};

//Check DB for Site given url
//params: id(INT)
//succ: -> site exists increaseHitCount(site.id) || return null
//fail: return err
const checkForSite = (targetUrl) => {
  return db.Site.findOne({
    where: {
      url : targetUrl
    }
  })
  .then(site => site ? increaseHitCount(site.id) : site)
  .catch(err => err);
};

//Add a new Site instance & initiate new task
//params: url(STRING) --should include .domain (handled on client)
//succ: -> site exists increaseHitCount(site.id) || return null
//fail: return err
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

//Add new Task instance, with site_id as a foreign key
//params: site_id(INT.req)
//succ: -> return site_id
//fail: return err
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

//Increase its hitCount of target site
//params: site_id(INT.req)
//succ: -> return site
//fail: return err
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
  checkForSiteById: checkForSiteById
};
