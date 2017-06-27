const db = require('../server/connection');

// add the url to the db

//create a worker queue -- redis?
// --- where to host this queue?

// ea time a usr posts a site, push it on

// worker shifts off queue, fetches & stores the
// content of the site

// try to fetch site
  // if has content, return content
  //res.redirect()
  // else, return: Still working!
