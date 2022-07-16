export default function checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`something went wrong, ${res.status}, ${res.statusText}`)
  }
  