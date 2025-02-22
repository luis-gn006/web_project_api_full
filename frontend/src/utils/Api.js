class Api {
  constructor(url, token) {
    this._url = url;
    this._token = token;
  }
  _makeRequest(uri, method = "GET", body = null) {
    const options = {
      headers: {
        "Content-Type": "application/json",
        authorization: this._token,
      },
      method,
    };
    if (body) {
      options.body = JSON.stringify(body);
    }
    const request = fetch(`${this._url}/${uri}`, options);
    return request
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(`Error: ${response.status}`);
      })
      .catch((error) => {
        console.error(error);
        throw error;
      });
  }
  getUserInfo() {
    return this._makeRequest("users/me");
  }
  getInitialCards() {
    return this._makeRequest("cards");
  }
  patchUserInfo(name, about) {
    return this._makeRequest("users/me", "PATCH", { name, about });
  }
  postNewCard(name, link) {
    return this._makeRequest("cards", "POST", { name, link });
  }
  deleteCard(cardId) {
    return this._makeRequest(`cards/${cardId}`, "DELETE", { cardId });
  }
  patchUserAvatar(avatar) {
    return this._makeRequest("users/me/avatar", "PATCH", { avatar });
  }
  changeLikeCardStatus(cardId, isLiked) {
    return this._makeRequest(
      `cards/likes/${cardId}`,
      `${isLiked ? "PUT" : "DELETE"}`,
      { cardId }
    );
  }
}
/*
const api = new Api(
  "https://around.nomoreparties.co/v1/web_es_10",
  "541d0e53-114b-4fb1-9af0-b09c04c191b9"
);*/

const api = new Api(
  "http://localhost:3000",
  "541d0e53-114b-4fb1-9af0-b09c04c191b9"
);

export default api;
