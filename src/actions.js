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
fetch('http://localhost:3000/api/v1/sign_in', {
    method: 'POST',
    headers: {
      'Accept': 'application/json'
    },
    body: {
      login: 'test'
    }
})
*/
