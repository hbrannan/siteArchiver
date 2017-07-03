## DESCRIPTION:
  Web Scraper & Archiver with SearchView (using HTML5 iFrames), DisplayView, and top 5 most-hit-sites display.
  -React/Redux - HTML5 iframes -Node/Express API -cron regulated workers -and Sequelize + sql db.

## TODOS:
 - add styles
 - escape html at fetch, and store escaped in db
 - improve testing coverage

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

Queue: (hasOne : Site)
  - id
  - site_id

## API:
  post /site, takes url:STRING
  get /site, takes id:INT, strings of numbers acceptable.
  get /top-sites


## STRETCH ideas:
 - top five error message display, in event should occur
 - improve 401/402/403s: message instead of <hmtl: not available>
 - trap errors occurring within iFrames (from data scripts)
 - return-to-site-display button
 - copy job_id to (cached) clipboard
 - webhook for topFiveUpdate
 - action types file
 - update sites every X time-period all matching on/before certain created-at timestamp (e.g. 2 wks ago);
 - site categories
 - cache user-sites in browser
 - users, w own top sites factoring in to top5 display, & my_recent_sites
