const baseURL = 'http://localhost:8081/license';

export const loadLicense = () => {
  return fetch(baseURL)
    .then(res => res.json());
}

export const createLicense = (l) => {
  return fetch(baseURL,{
    method: 'POST',
    headers: {
      'Accept':'application/json',
      'Content-Type':'application/json'
    },
    body: JSON.stringify(l)
  }).then(res => res.json());

}

export const saveLicense = (l) => {
  return fetch(`${baseURL}/${l.id}`,{
    method: 'PUT',
    headers: {
      'Accept':'application/json',
      'Content-Type':'application/json'
    },
    body: JSON.stringify(l)
  }).then(res => res.json());

}

export const destroyLicense = (l) => {
  return fetch(`${baseURL}/${l}`,{
    method: 'DELETE',
    headers: {
      'Accept':'application/json',
      'Content-Type':'application/json'
    }
  })

}
