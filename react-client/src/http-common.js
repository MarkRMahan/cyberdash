import fetch from "node-fetch";

const originalUrl = `http://${process.env.REACT_APP_HOST_IP}:8081/api`;

export default async function getData(additionalUrl = '', data) {
  // Default options are marked with *

  let reqBody = {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    //credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  };

  const fullUrl = `${originalUrl}${additionalUrl}`;

  let plsWork = await fetch(fullUrl, reqBody)
  .then(response => response.json())
  .then(data => {
    return data;
  });

  return plsWork;

}
