import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import EventDetails from "../views/EventDetailView.vue";
import AirlineDetails from "../views/AirlineDetails.vue";
import LayoutView from "../views/LayoutView.vue";
import NotFoundPage from "../views/event/NotFoundPage.vue";
import EditPass from "../views/event/editPassDetail.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/select/:id",
    name: "LayoutView",
    component: LayoutView,
    props: true,
    children: [
      {
        path: "/passenger/:id",
        name: "EventDetails",
        component: EventDetails,
        props: true,
      },
      {
        path: "/airline/:id",
        name: "AirlineDetails",
        component: AirlineDetails,
        props: true,
      },
      {
        path: "/edit/:id",
        name: "EditPassenger",
        component: EditPass,
        props: true,
      },
    ],
  },
  {
    path: "/:catchAll(.*)",
    name: "NotFoundPage",
    component: NotFoundPage,
  },
  {
    path: "/404/:resource",
    name: "404Resource",
    component: NotFoundPage,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
