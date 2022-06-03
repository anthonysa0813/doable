import { references } from "./func.js";

const btnLogin = document.querySelector("#login");
const btnSignup = document.querySelector("#signup");
const btnHome = document.querySelector("#home");
const root = document.querySelector("#root");

function Login() {
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
    <button type="button" class="rounded6 font16">Login</button>
    <a onclick="${references()}" class="text-center" id="createRefUser">Create Account</a>
  </form>
    </div>
  `;
}

// function Signup() {
//   return `
//     <div class="loginContainer">
//       <form class="">
//     <div class="field ">
//       <label>Email</label>
//       <input type="email" class="rounded6" name="email"/>
//     </div>
//     <div class="field">
//       <label>Password</label>
//       <input type="password" class="rounded6" name="password"/>
//     </div>
//     <button type="button" class="rounded6 font16">Create Account</button>
//     <a onclick="loginPage() class="text-center" id="createRefUser">Login</a>
//   </form>
//     </div>
//   `;
// }

export const routes = [
  { path: "/login", component: Login() },
  { path: "/signup", component: "/signup" },
  { path: "/logout", component: "/logout" },
  { path: "/home", component: "/home" },
];

class Router {
  constructor(path, routes) {
    this.path = path;
    this.routes = routes;
    this.pathMatch = null;
    console.log({ path: this.path });
  }

  pathMatched() {
    this.pathMatch = this.routes.find((route) => route.path === this.path);
  }

  showTemplate() {
    // window.history.pushState("", "", this.pathMatch.path);
    root.innerHTML = this.pathMatch.component;
  }
}

btnLogin.addEventListener("click", () => {
  console.log("jij login");
  const router = new Router("/login", routes);
  router.pathMatched();
  router.showTemplate();
});

btnSignup.addEventListener("click", () => {
  console.log("jij signuip");

  const router = new Router("/signup", routes);
  router.pathMatched();
  router.showTemplate();
});

btnHome.addEventListener("click", () => {
  console.log("jij home");
  const router = new Router("/home", routes);
  router.pathMatched();
  router.showTemplate();
});

// window.addEventListener("DOMContentLoaded", () => {});

// login({
//   email: "anthony@mail.com",
//   password: "123456",
// })
//   .then((res) => console.log(res))
//   .catch((err) => console.log(err));
