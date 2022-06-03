const root = document.querySelector("#root");

function Signup() {
  return `
    <div class="loginContainer">
      <form class="">
    <div class="field ">
      <label>Email</label>
      <input type="email" class="rounded6" name="email"/>
    </div>
    <div class="field">
      <label>Password</label>
      <input type="password" class="rounded6" name="password"/>
    </div>
    <button type="button" class="rounded6 font16">Create Account</button>
    <a onclick="loginPage() class="text-center" id="createRefUser">Login</a>
  </form>
    </div>
  `;
}

export function references() {
  root.innerHTML = Signup();
  const form = document.querySelector("form");
  console.log(form);
}

function loginPage() {
  root.innerHTML = Signup();
  const form = document.querySelector("form");
}
