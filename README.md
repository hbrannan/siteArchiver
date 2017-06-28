## DESCRIPTION:
  Web Scraper with React/Redux client, client-side cache (top 5 most-hit & user-accessed sites), node/ express server, a worker on a cron cycle, and a sql db.

## TODOS:
 - Testing
 -

## RUN:
 - client: ``yarn start``
 - server: ``nodemon server/index.js``

## BUILD:

``... ``


## TEST:

``... ``


## NOTES:


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
  get /sites -top5 hits


STRETCH ideas:
 - top 5 display (mini-screenshot)
 - update old sites every X time-period all matching on/before certain created-at timestamp (e.g. 2 wks ago);
