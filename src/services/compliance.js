const baseURL = 'http://localhost:8081/compliance';

export const loadCompliance = () => {
  return fetch(baseURL)
    .then(res => res.json());
}

export const createCompliance = (c) => {
  return fetch(baseURL,{
    method: 'POST',
    headers: {
      'Accept':'application/json',
      'Content-Type':'application/json'
    },
    body: JSON.stringify(c)
  }).then(res => res.json());

}

export const saveCompliance = (c) => {
  return fetch(`${baseURL}/${c.id}`,{
    method: 'PUT',
    headers: {
      'Accept':'application/json',
      'Content-Type':'application/json'
    },
    body: JSON.stringify(c)
  }).then(res => res.json());

}

export const destroyCompiance = (c) => {
  return fetch(`${baseURL}/${c}`,{
    method: 'DELETE',
    headers: {
      'Accept':'application/json',
      'Content-Type':'application/json'
    }
  })

}
