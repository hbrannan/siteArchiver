const db = require('../../database/connection');

function initDB () {
  return db.Site.bulkCreate([
    {url: 'beyonce.com',hitCount: 9, html:null},
    {url: 'massdrop.com',hitCount: 10, html:null},
    {url: 'google.com',hitCount: 20, html:'%3Chtml%3E%3Cbody%3E%3Cdiv%3EHello%20World%3C/div%3E%3C/body%3E%3C/html%3E'},
    {url: 'apple.com',hitCount: 8, html:null},
    {url: 'billnye.com',hitCount: 7, html:null},
    {url: 'suzuki.com',hitCount: 0, html:null}
  ])
  .then(() => {
    return db.Task.create()
  })
  .then((task) => {
    return task.setSite(1)
  })
  .catch((err) => {
    console.log('e r r o r  in initTestDB!!', err)
    return err
  });
}

module.exports = initDB
