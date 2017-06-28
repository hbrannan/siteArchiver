import fetch from 'isomorphic-fetch';
console.log(fetch)

// const serverPath

const retrieveUrl  = () => {

};

export function requestUrl (url) {
  console.log('actions:7', url);

  fetch(`http://localhost:3000/site?url=${url}`)
  .then(response => console.log(response))
  .catch(err => console.log(err));
  return { type: 'REQUEST_URL', url: url }
}


/*
example: https://github.com/matthew-andrews/isomorphic-fetch/issues/51
*/
