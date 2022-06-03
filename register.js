const form = document.querySelector("form");
const btnEmail = document.querySelector("input[type='email']");
const btnPassword = document.querySelector("input[type='password']");
const BASE_URI = "https://doable-api.herokuapp.com/";
const tokenKey = "doable_token";

async function register(user) {
  const response = await fetch(`${BASE_URI}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.errors);
  }
  window.history.pushState("", "", "/");
  window.location.reload();

  sessionStorage.setItem(tokenKey, data.token);

  return data;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const user = {
    email: btnEmail.value,
    password: btnPassword.value,
  };
  console.log({ register: user });
  register(user)
    .then((res) => console.log(res))
    .catch((err) => console.log(error));
});
