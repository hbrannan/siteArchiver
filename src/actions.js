import fetch from 'isomorphic-fetch';
console.log(fetch)

// const serverPath

const retrieveUrl  = () => {

};

export function requestUrl (url) {
  console.log('actions:7', url);
  //invalid parameter issue: either index.js headers ||
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
  fetch(`http://localhost:3000/site?url=${url}`)
  .then(response => console.log(response))
  .catch(err => console.log(err));

  return { type: 'REQUEST_URL', url: url }
}


/*
example: https://github.com/matthew-andrews/isomorphic-fetch/issues/51
*/
