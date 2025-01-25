import { createApp } from "vue";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import RegisterForm from "./components/RegisterForm.vue";
import LoginForm from "./components/LoginForm.vue";
import Contact from "./views/contact.vue";
import Services from "./views/Services.vue";
import TodoList from "./views/Todo-List.vue";
import About from "./views/About.vue";

import SelectAllArtistes from "./views/dataAPI/selectAllArtistes.vue";
import DashboardAPI from "./views/dataAPI/dashboardAPI.vue";
import Albums from "./views/dataAPI/albums.vue";
import Corbeille from "./views/dataAPI/corbeille.vue";
import Genres from "./views/dataAPI/genres.vue";
import PostTracks from "./views/dataAPI/postTracks.vue";
import SubNavBar from "./views/dataAPI/sub-NavBar.vue";
import AllData from "./views/dataAPI/data/allData.vue";
import RedirectAllData from "./views/dataAPI/buttonAllData.vue";

const routes = [
  { path: "/", component: RegisterForm },
  { path: "/about", component: About },
  { path: "/login", component: LoginForm },
  { path: "/services", component: Services },
  { path: "/contact", component: Contact },
  { path: "/todos-list", component: TodoList },
  { path: "/selectAll", component: SelectAllArtistes },
  { path: "/albums", component: Albums },
  { path: "/corbeille", component: Corbeille },
  { path: "/genres", component: Genres },
  { path: "/tracks", component: PostTracks },
  { path: "/sub-navbar", component: SubNavBar },
  { path: "/dashboardAPI", component: DashboardAPI },
  { path: "/allData", component: AllData },
  { path: "/redirectAllData", component: RedirectAllData },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(App).use(router).mount("#app");
