
// as a Queue fetch first 5 (lowest primID)
  // for ea
    //get site content, convert to string
    //on successful update of Site(found by site_id) ->
    // then on succ. delete of Task (found by id)
    // shift Task off of the queue,
    // continue to next item until: no more items in Q

    //then grab next up-to-five

    //If DB Queue empty, stop
    // ...

    //until: cron job?
    // next update to Site? -- too many calls
    // next 5 updates to Site ?  -- if in Q, cte.
