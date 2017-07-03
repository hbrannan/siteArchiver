const db = require('../database/connection');
const request = require('request')
const queuePath = `http://localhost:${process.env.JOB_PORT}`

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
  const body = JSON.stringify({siteId: site_id})

  return new Promise ((resolve, reject) => {
    return request({
      url: `${queuePath}/task`,
      method: 'POST',
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
    const site = JSON.parse(res.body)
    return site.siteId
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
