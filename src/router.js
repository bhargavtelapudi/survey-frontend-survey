import { createWebHistory, createRouter } from "vue-router";
const routes = [
  {
    name: 'surveysList',
    path: '/',
    component: () => import('./views/survey/SurveysList.vue')
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./views/auth/Login.vue")
  },
  {
    name: 'createSurvey',
    path: '/create-survey',
    component: () => import('./views/survey/CreateSurvey.vue')
  }
];
const router = createRouter({
  base: process.env.NODE_ENV === 'development' ? '/' : '/survey-frontend-admin/',
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;