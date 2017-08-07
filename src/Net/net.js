const server = 'http://localhost:8089';
export const get = (url) => fetch(`${server}${url}`).then(res => res.json());

export const post = (url, params) => fetch(`${server}${url}`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
  body: JSON.stringify(params),
}).then(res => res.json())