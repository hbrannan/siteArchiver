## DESCRIPTION:
  Web Scraper & Archiver with SearchView (using iFrames), SiteView, and Top 5 Most Hit display.
  -React/Redux -Node/Express API -Cron regulated workers -and Sequelize + (dev) sqlite db.

## TODOS:
 - add styles
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
     - if calling the API directly, note:
     - API currently supports only http://
                     supports only one site at a time
                     expects Content-Type of application/json
     - url string should NOT itself include http://
     - url string SHOULD include a .domain
    example: google.com

  get /site, takes id:INT, a stringified number is acceptable.
     - API currently supports only query id at a time
    example: 1
    example: '1'

  get /top-sites
     - no params
     - returns an array of html string of the top 5 most hit sites


## STRETCH ideas:
 - not found -> did you mean... ? (google search API integration)
 - top five error message display, in event should occur
 - improve 3*4*: status code messages instead of providing <hmtl: not available>
 - trap errors occurring within iFrames (from data scripts)
 - return-to-site-display button
 - copy job_id to (cached) clipboard
 - webhook for topFiveUpdate
 - react router for browser history
 - action types file
 - update sites every X time-period all matching on/before certain created-at timestamp (e.g. 2 wks ago);
 - site categories
 - cache user-sites in browser
 - users, w own top sites factoring in to top5 display, & my_recent_sites
