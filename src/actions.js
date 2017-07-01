import fetch from 'isomorphic-fetch';
const serverPath = 'http://localhost:3000';

export const REQUESTING_URL = 'REQUESTING_URL'
function requestingUrl (url) {
  return {
    type: REQUESTING_URL,
    url
  }
}

export const HTML_FETCH_SUCCESS = 'HTML_FETCH_SUCCESS'
function urlHTMLSuccess (html) {
  return {
    type: HTML_FETCH_SUCCESS,
    html
  }
}

export const URL_COMING_SOON = 'URL_COMING_SOON'
function urlComingSoon (msgObj) {
  return {
    type: URL_COMING_SOON,
    msgObj
  }
}

export const URL_FETCH_FAILURE = 'URL_FETCH_FAILURE'
function urlFetchError (errObj) {
  return {
    type: URL_FETCH_FAILURE,
    errObj
  }
}

export function requestUrl (url) {

  return dispatch => {

    dispatch(requestingUrl(url))

    return fetch(`${serverPath}/site?url=${url}`)
    .then(
      response => response.json(),
      error => {console.log('An error occured.', error); dispatch(urlFetchError(error)) }// need to dispatch the error
    )
    .then(res => {
      console.log('R E S U L T   I S ', res)
      if (res.html) dispatch(urlHTMLSuccess(res.html))
      else dispatch(urlComingSoon(res.msg))
    })
  }
}

export function backToMain () {
  return { type: 'BACK_TO_MAIN' }
}


/*
https://codepen.io/stowball/post/a-dummy-s-guide-to-redux-and-thunk-in-react
http://redux.js.org/docs/advanced/AsyncActions.html
example: https://github.com/matthew-andrews/isomorphic-fetch/issues/51
*/
  //if fetch, post -> invalid parameter issue: either index.js headers ||
  //middleware use (of body-parser)
  // here.. more likely one of the former
  // fetch('http://localhost:3000/site', {
  //     method: 'POST',
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json'
  //     },
  //     body: {
  //       url: `${url}`
  //     }
  // })
  // .then(response => console.log(response))
  // .catch(err => console.log(err));
