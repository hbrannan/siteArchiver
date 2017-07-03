## DESCRIPTION:
  Demo Web Scraper/ Archiver synced with Job Queue ( called on cron job ) that fetches & stores URL data from submissions.
  Project includes:
  - React/Redux client with SearchView (using iFrames), SiteView, and Top 5 Most Hit display.
  - Node/Express server:
     - serves static client
     - REST API to add / request sites
     - inits cronJob to check Queue
  - JobQueue:
    - is called via cron job API tasks
    - (if any) handles earliest task
    - (upon confirmed html-add) deletes task from queue
  - Sqlite DBs with Sequelize ORM
  - Testing:
    - Front end: Jest & Enzyme, Nock & Thunk
    - Server: Mocha, Chai, and Supertest

## Install:
 ```yarn install```

## RUN:
 - Client: ```yarn start```
 - Server: ```yarn start:server```
 - JobQueue: ```yarn start:queue```

## TEST:
 - Client: ```yarn test```
 - API + JobQueue: ```yarn test:queue``` && ```yarn test:server```

## DB TABLE:
Site:
  - id
  - url
  - htmlContent
  - hitCount
  - timestamp


## QUEUE TABLE:
Task:
  - id
  - siteId

## Client-Facing API:

  - post /site, takes url:STRING
    if calling the API directly, note:
     - API currently requests only to http://
                     supports only one site at a time
                     expects Content-Type of application/json
     - url string should NOT itself include http://
     - url string SHOULD include a .domain
     example: google.com
    if using the webage, not:
     - if no domain is provided, defaults to `.com`

  - get /site, takes id:INT, a stringified number is acceptable.
     - API currently supports only query id at a time
    example: 1
    example: '1'

  - get /top-sites
     - no params
     - returns an array of html string of the top 5 most hit sites

## Next TODOS:
 - improve start & testing scripts automation
 - restrict cors
 - improve styles
 - improve testing coverage

## STRETCH ideas:
 - not found -> did you mean... ? (google search API integration)
 - top five error message display, in event should occur
 - improve 3*4*: status code messages instead of providing <hmtl: not available>
 - trap errors occurring within iFrames (from data scripts)
 - return-to-site-display button
 - copy job_id to (cached) clipboard
 - webhook for topFiveUpdate
 - webhook for your requested task # is completed
 - react router for browser history
 - action types file
 - set up proxies with webpack
 - update sites every X time-period all matching on/before certain created-at timestamp (e.g. 2 wks ago);
 - site categories
 - cache user-sites in browser
 - users, w own top sites factoring in to top5 display, & my_recent_sites
