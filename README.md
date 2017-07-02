## DESCRIPTION:
  Web Scraper & Archiver with SearchView (using HTML5 iFrames), DisplayView, and top 5 most-hit-sites display.
  -React/Redux - HTML5 iframes -Node/Express API -cron regulated workers -and Sequelize + sql db.

## TODOS:
 - add styles
 - escape html at fetch, and store escaped in db
 - topFive error message display
 - webhook for topFiveUpdate incl. if error, keep what's there.
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
  post /site
  get /top-sites


## STRETCH ideas:
 - top 5 display (mini-screenshot)
 - update sites every X time-period all matching on/before certain created-at timestamp (e.g. 2 wks ago);
 - site categories
 - cache user-sites in browser
 - users have own top sites, which would override general top 5
