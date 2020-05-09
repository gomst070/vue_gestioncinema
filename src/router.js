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
      name: "add-film",
      component: () => import("./components/FilmAdd")
    },
    {
      path: "/seances",
      name: "seances",
      component: () => import("./components/SeanceList")
    },
    {
      path: "/seances/:id",
      name: "seances-details",
      component: () => import("./components/Seance")
    },
    {
      path: "/addseance",
      name: "add-seance",
      component: () => import("./components/SeanceAdd")
    },
    {
      path: "/oldseance",
      name: "old-seance",
      component: () => import("./components/SeanceOld")
    },
    {
      path: "/salles",
      name: "salles",
      component: () => import("./components/SalleList")
    },
    {
      path: "/addsalle",
      name: "add-salle",
      component: () => import("./components/SalleAdd")
    },
    {
      path: "/salles/:id",
      name: "salles-details",
      component: () => import("./components/Salle")
    },
    {
      path: "/categories",
      name: "categories",
      component: () => import("./components/CategorieList")
    },
    {
      path: "/addcategorie",
      name: "add-categorie",
      component: () => import("./components/CategorieAdd")
    },
    {
      path: "/categories/:id",
      name: "categories-details",
      component: () => import("./components/Categorie")
    },
  ]
});