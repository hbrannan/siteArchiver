const db = require('../database/connection');

/* if site exists: add to hitCount
  // if html, return it.
  // else : return: archive coming soon!
 else site !exists: add it.
*/
const checkForSite = (targetUrl) => {
  db.Site.findOne({
    where: {
      url : targetUrl
    }
  })
  .then(site => {
    console.log(site);
    if (site && site.dataValues.html){
      //increase 'hitCount' by 1;
      //if html
      return site.dataValues.html;
      //else coming soon
    } else {
      return addNewSite(targetUrl);
    }
  })
  .catch(err => err);
};

/*
  Site: url, html, hit_count
*/
const addNewSite = (targetUrl) => {
  console.log('calling addNewSite');
  db.Site.create({
    url: targetUrl
  })
  .then((data) => {
    console.log(data.dataValues)
    //then get the ID and add a task w that id
    // if errors here, send error
  })
  .catch((err) => console.log(err));
};

const pullFromQueue = () => {
  //note: do this in batches?

  // get lowest id,
  // find site w/ that site idx
  // request html
  // addHtml()
};

const addHtml = (siteId, html) => {
  // store html at siteId
  // shiftOffQueu
};

const shiftOffQueue =  () => {
  //
};

module.exports = {
  checkForSite: checkForSite
};
