import { routes } from "./router/router.js";

const btnLogin = document.querySelector("#login");
const btnSignup = document.querySelector("#signup");
const btnHome = document.querySelector("#home");
const root = document.querySelector("#root");

console.dir(btnLogin);

// function Router(path, routes) {
//   const pathMatched = routes.find((route) => route.path === path);
//   showTemplate(pathMatched);
//   function showTemplate(routeObject) {
//     window.history.pushState("", "", routeObject.path);
//     root.innerHTML = routeObject.component;
//   }
// }

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
    window.history.pushState("", "", this.pathMatch.path);
    root.innerHTML = this.pathMatch.component;
  }
}

btnLogin.addEventListener("click", () => {
  const router = new Router("/login", routes);
  router.pathMatched();
  router.showTemplate();
});

btnSignup.addEventListener("click", () => {
  const router = new Router("/signup", routes);
  router.pathMatched();
  router.showTemplate();
});

btnHome.addEventListener("click", () => {
  const router = new Router("/home", routes);
  router.pathMatched();
  router.showTemplate();
});
