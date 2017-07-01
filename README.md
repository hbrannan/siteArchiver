## DESCRIPTION:
  Web Scraper & Archiver with SearchView, DisplayView, and top 5 most-hit-sites display.
  -React/Redux - HTML5 iframes -Node/Express API -cron regulated workers -and Sequelize + sql db.

## TODOS:
 - init cron jobs
 - init top-5 query on TopFive containerDidMount
     -& syncactions -> state updates -> render mapping
 - improve testing coverage
 - refactor post
 - escape html at fetch, and store escaped in db
 - add styles

## RUN:
 - client: ``yarn start``
 - server: ``nodemon server/index.js``

## TEST:

``yarn test``


## DB TABLES:
Sites:
  - id
  - url
  - htmlContent
  - hitCount
  - timestamp

Queue:
  - id
  - site_id


API:
  post /site
  get /top-sites


STRETCH ideas:
 - top 5 display (mini-screenshot)
 - update sites every X time-period all matching on/before certain created-at timestamp (e.g. 2 wks ago);
 - site categories
 - cache user-sites in browser
 - users have own top sites, which would override general top 5
