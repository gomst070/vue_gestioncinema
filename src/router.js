import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      alias: "/home",
      name: "home",
      component: () => import("./components/Home")
    },
    {
      path: "/films",
      name: "films",
      component: () => import("./components/FilmList")
    },
    {
      path: "/films/:id",
      name: "films-details",
      component: () => import("./components/Film")
    },
    {
      path: "/addfilm",
      name: "add",
      component: () => import("./components/AddFilm")
    }
  ]
});