const BASE_URI = "https://doable-api.herokuapp.com/";
const tokenKey = "doable_token";

export async function login(credentials = { email, password }) {
  const response = await fetch(`${BASE_URI}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.errors);
  }

  sessionStorage.setItem(tokenKey, data.token);
  return data;
}

export async function logout() {
  const token = sessionStorage.getItem(tokenKey);
  const response = await fetch(`${BASE_URI}/logout`, {
    method: "DELETE",
    headers: {
      Authorization: `Token token=${token}`,
    },
  });

  let data;

  try {
    data = await response.json();
  } catch (error) {
    data = response.statusText;
  }
  if (!response.ok) {
    throw new Error(data.errors);
  }

  sessionStorage.removeItem(tokenKey);
  return data;
}
