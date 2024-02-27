import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LettersView from '../views/LettersView.vue'; // LettersView를 import 합니다.

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/letters',
    name: 'Letters',
    component: LettersView, // '/letters' 경로에 LettersView 컴포넌트를 매핑합니다.
  },
  // 기타 라우터 설정이 있을 경우 여기에 추가합니다.
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
