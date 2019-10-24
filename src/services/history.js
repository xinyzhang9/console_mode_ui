const baseURL = 'http://localhost:8081/history';

export const loadHistory = () => {
  return fetch(baseURL)
    .then(res => res.json());
}

export const createHistory = (history) => {
  return fetch(baseURL,{
    method: 'POST',
    headers: {
      'Accept':'application/json',
      'Content-Type':'application/json'
    },
    body: JSON.stringify(history)
  }).then(res => res.json());

}

export const saveHistory = (history) => {
  return fetch(`${baseURL}/${history.id}`,{
    method: 'PUT',
    headers: {
      'Accept':'application/json',
      'Content-Type':'application/json'
    },
    body: JSON.stringify(history)
  }).then(res => res.json());

}

export const destroyHistory = (id) => {
  return fetch(`${baseURL}/${id}`,{
    method: 'DELETE',
    headers: {
      'Accept':'application/json',
      'Content-Type':'application/json'
    }
  })

}
