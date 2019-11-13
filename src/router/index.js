import Vue from "vue";
import Router from "vue-router";

import Login from "../pages/login.vue";
import SignIn from "../pages/signin.vue";
import Home from "@/components/home.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/signin",
      name: "SignIn",
      component: SignIn
    }
  ]
});
