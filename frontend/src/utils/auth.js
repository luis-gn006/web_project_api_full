export const BASE_URL = "https://se-register-api.en.tripleten-services.com/v1";

export const register = async (email, password) => {
  try {
    const response = await fetch(`${BASE_URL}/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password}),
    });

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error('Error:', err);
    throw err
  }
};

export const login = async (email, password) => {
  try {
    const response = await fetch(`${BASE_URL}/signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password}),
    });

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error('Error:', err);
    throw err
  }
};

export const getUserToken = async (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  });
}
