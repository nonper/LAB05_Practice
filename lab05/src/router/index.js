import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import EventDetails from "../views/EventDetailView.vue";
import AirlineDetails from "../views/AirlineDetails.vue";
import LayoutView from "../views/LayoutView.vue";
import NotFoundPage from "../views/event/NotFoundPage.vue";
import EditPass from "../views/event/editPassDetail.vue";
import EventService from "@/services/EventService.js";
import GStore from "@/store";
import NProgress from "nprogress";
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
        beforeEnter: (to) => {
          return EventService.getEventPass(to.params.id)
            .then((res) => {
              GStore.event = res.data;
            })
            .catch((error) => {
              if (error.response && error.response.status == 404) {
                return {
                  name: "404Resource",
                  params: { resource: "event" },
                };
              } else {
                return { name: "NetworkError" };
              }
            });
        },
      },
      {
        path: "/airline/:id",
        name: "AirlineDetails",
        component: AirlineDetails,
        props: true,
        beforeEnter: (to) => {
          return EventService.getEventAirline(to.params.id)
            .then((res) => {
              GStore.event = res.data;
            })
            .catch((error) => {
              if (error.response && error.response.status == 404) {
                return {
                  name: "404Resource",
                  params: { resource: "event" },
                };
              } else {
                return { name: "NetworkError" };
              }
            });
        },
      },
      {
        path: "/edit/:id",
        name: "EditPassenger",
        component: EditPass,
        beforeEnter: (to) => {
          return EventService.getEventPass(to.params.id)
            .then((res) => {
              GStore.event = res.data;
            })
            .catch((error) => {
              if (error.response && error.response.status == 404) {
                return {
                  name: "404Resource",
                  params: { resource: "event" },
                };
              } else {
                return { name: "NetworkError" };
              }
            });
        },
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

router.beforeEach(() => {
  NProgress.start();
});
router.afterEach(() => {
  NProgress.done();
});

export default router;
