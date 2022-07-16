class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`something goes wrong: ${res.status} ${res.statusText}`);
}

  async getCardList() {
    const res = await fetch(this._baseUrl + "/cards", {
      headers: this._headers,
    });
    return this._checkResponse(res)
  }

  async getUserInfo() {
    const res = await fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    });
    return this._checkResponse(res)
  }

  getAppInfo() {
    return Promise.all([this.getUserInfo(), this.getCardList()]);
  }

  async addCard(name, link) {
    const res = await fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    });
    return this._checkResponse(res)
  }

  async removeCard(cardId) {
    const res = await fetch(`${this._baseUrl}/cards/${cardId}`, {
      headers: this._headers,
      method: "DELETE",
    });
    return this._checkResponse(res)
  }

  async changeLikeCardStatus(cardId, like) {
    if (like) {
      const res = await fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
        headers: this._headers,
        method: "PUT",
        body: JSON.stringify({
          like,
        }),
      });
      return this._checkResponse(res)
    } else {
      const res_1 = await fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
        headers: this._headers,
        method: "DELETE",
      });
      return await (
        res_1.ok ? res_1.json() : Promise.reject("Error" + res_1.statusText));
    }
  }

  async setUserInfo(name, about) {
    const res = await fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    });
    return this._checkResponse(res)
  }

  async setUserAvatar(link) {
    const res = await fetch(`${this._baseUrl}/users/me/avatar`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({
        avatar: link,
      }),
    });
    return this._checkResponse(res)
  }
}

const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://api.bogush.students.nomoredomainssbs.ru'
    : 'http://localhost:3000';

const api = new Api({
  baseUrl: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
