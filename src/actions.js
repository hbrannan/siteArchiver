import fetch from 'isomorphic-fetch';
const serverPath = 'http://localhost:3000';

/*
 T O C
  requestUrl
      - REQUESTING_URL
      - HTML_FETCH_SUCCESS
      - URL_COMING_SOON
      - URL_FETCH_FAILURE
  requestSiteById
      -> feeds into requestUrl flow
  requestTopFive
      - REQUESTING_TOP_Five
      - TOP_FIVE_SUCCESS
      - TOP_FIVE_FAILURE
  backToMain
      - BACK_TO_MAIN
*/

export const REQUESTING_URL = 'REQUESTING_URL'
function requestingUrl () {
  return { type: REQUESTING_URL }
}

export const HTML_FETCH_SUCCESS = 'HTML_FETCH_SUCCESS'
function urlHTMLSuccess (html) {
  return {
    type: HTML_FETCH_SUCCESS,
    html
  }
}

export const URL_COMING_SOON = 'URL_COMING_SOON'
function urlComingSoon (msg) {
  console.log('coming soon', msg)
  return {
    type: URL_COMING_SOON,
    msg
  }
}

export const URL_FETCH_FAILURE = 'URL_FETCH_FAILURE'
function urlFetchError (errObj) {
  console.log('Server error has occurred:', errObj)
  return { type: URL_FETCH_FAILURE }
}

export function requestUrl (url) {

  return dispatch => {

    dispatch(requestingUrl())

    const body = JSON.stringify({url: `${url}`})
    return fetch(`${serverPath}/site`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: body
    })
    .then(
      response => response.json(),
      error => dispatch(urlFetchError(error))
    )
    .then(res => {
      if (res && res.html) dispatch(urlHTMLSuccess(res.html))
      else if (res.msg) dispatch(urlComingSoon(res.msg))
    })
  }
}

export function requestSiteById (id) {
  return dispatch => {

    dispatch(requestingUrl())

    return fetch(`${serverPath}/site?id=${id}`)
    .then(
      response => response.json(),
      error => dispatch(urlFetchError(error))
    )
    .then(res => {
      if (res && res.html) dispatch(urlHTMLSuccess(res.html))
      else if (res.msg) dispatch(urlComingSoon(res.msg))
    })
  }
}

export function requestTopFive () {
  return dispatch => {
    dispatch(requestingTopFive())
    return fetch(`${serverPath}/top-sites`)
    .then(
      response => response.json(),
      error => dispatch(topFiveError(error))
    )
    .then(result => {
      console.log(result)
      if (result.sites) {
        dispatch(topFiveSuccess(result.sites))
      }
    })
  };
}

export const REQUESTING_TOP_FIVE = 'REQUESTING_TOP_FIVE'
function requestingTopFive () {
  return { type: REQUESTING_TOP_FIVE }
}

export const TOP_FIVE_SUCCESS = 'TOP_FIVE_SUCCESS'
function topFiveSuccess (sites) {
  return {
    type: TOP_FIVE_SUCCESS,
    sites
  }
}

export const TOP_FIVE_FAILURE = 'TOP_FIVE_FAILURE'
function topFiveError (errObj) {
  return {
    type: TOP_FIVE_FAILURE,
    errObj
  }
}

export function backToMain () {
  return { type: 'BACK_TO_MAIN' }
}
