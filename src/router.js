import { createWebHistory, createRouter } from "vue-router";
const routes = [
  {
    name: 'submitSurvey',
    path: '/survey-frontend-survey/submit-survey/:surveyId',
    component: () => import('./views/SubmitSurvey.vue'),
    props: true
  },
  {
    name: '404',
    path: '/survey-frontend-survey/',
    component: () => import('./views/404.vue'),
    props: true
  }
];
const router = createRouter({
  base: process.env.NODE_ENV === 'development' ? '/' : '/survey-frontend-survey/',
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;