import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Signup from "../views/Signup.vue";
import Login from "../views/Login.vue";
import Logout from "../views/Logout.vue";
import UsersShow from "../views/UsersShow.vue";
import UsersEdit from "../views/UsersEdit.vue";
import PostsNew from "../views/PostsNew.vue";
import PostsShow from "../views/PostsShow.vue";
import PostsEdit from "../views/PostsEdit.vue";
import BoardsIndex from "../views/BoardsIndex.vue";
import BoardsShow from "../views/BoardsShow.vue";
import BoardsNew from "../views/BoardsNew.vue";
import BoardsEdit from "../views/BoardsEdit.vue";
import vueScrollBehavior from "vue-scroll-behavior";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/signup",
    name: "signup",
    component: Signup
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/logout",
    name: "logout",
    component: Logout
  },
  {
    path: "/users/:id",
    name: "users-show",
    component: UsersShow
  },
  {
    path: "/users/:id/edit",
    name: "users-edit",
    component: UsersEdit
  },
  {
    path: "/posts/new",
    name: "posts-new",
    component: PostsNew
  },
  {
    path: "/posts/:id",
    name: "posts-show",
    component: PostsShow
  },
  {
    path: "/posts/:id/edit",
    name: "posts-edit",
    component: PostsEdit
  },
  {
    path: "/boards",
    name: "boards-index",
    component: BoardsIndex
  },
  {
    path: "/boards/new",
    name: "boards-new",
    component: BoardsNew
  },
  {
    path: "/boards/:id",
    name: "boards-show",
    component: BoardsShow
  },
  {
    path: "/boards/:id/edit",
    name: "boards-edit",
    component: BoardsEdit
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

Vue.use(vueScrollBehavior, { router: router });

export default router;
