import {MD5} from 'react-native-crypto-js';

const BASE_URL = 'http://gateway.marvel.com/v1/public';
const PRIVATE_KEY = '7ad92dc3967b4037d982c01bf273414aa3c18cbd';
const PUBLIC_KEY = '1d01819839f2326319cfa3fa5e279d95';

function objectToQueryParameters(paramObject) {
  let queryParameters = '?';
  Object.keys(paramObject).forEach(key => {
    queryParameters += key + '=' + paramObject[key] + '&';
  });

  queryParameters = queryParameters.slice(0, queryParameters.length - 1);

  return queryParameters;
}

class API {
  getCharacters(additionalParams) {
    const timestamp = Number(Date.now());
    const hash = MD5(timestamp + PRIVATE_KEY + PUBLIC_KEY);

    const params = {
      ...additionalParams,
      ts: timestamp,
      apikey: PUBLIC_KEY,
      hash,
    };
    const url = BASE_URL + '/characters' + objectToQueryParameters(params);
    console.log(url);
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      })
        .then(response => response.json())
        .then(data => resolve(data))
        .catch(data => reject(data));
    });
  }

  getCharacterById(characterId, additionalParams) {
    const timestamp = Number(Date.now());
    const hash = MD5(timestamp + PRIVATE_KEY + PUBLIC_KEY);

    const params = {
      ...additionalParams,
      ts: timestamp,
      apikey: PUBLIC_KEY,
      hash,
    };
    const url = BASE_URL + '/characters/' + characterId + '/comics' + objectToQueryParameters(params);
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      })
      .then(response => response.json())
      .then((data) => resolve(data))
      .catch(data => reject(data));
    });
  };
}

const apiSingleton = new API();
export default apiSingleton;
