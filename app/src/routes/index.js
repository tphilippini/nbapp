import { AuthLayout, Default } from '@/layouts';
import { Home, NotFound } from '@/views';
import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore, useMessageStore } from '@/stores';

import accountRoutes from '@/routes/account.routes';
import authRoutes from '@/routes/auth.routes';
import jwtDecode from 'jwt-decode';
// import usersRoutes from '@/routes/users.routes';
import { storeToRefs } from 'pinia';

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      component: Default,
      children: [
        {
          path: '',
          name: 'home',
          component: Home,
          meta: { requiresAuth: true },
        },
      ],
    },
    { ...authRoutes },
    { ...accountRoutes },
    // catch all redirect to home page
    {
      path: '/:pathMatch(.*)*',
      component: AuthLayout,
      children: [
        {
          path: '',
          name: 'notFound',
          component: NotFound,
        },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  // clear alert on route change
  const messageStore = useMessageStore();
  messageStore.clear();

  const authStore = useAuthStore();
  const { auth } = storeToRefs(authStore);
  const publicPages = ['/auth/signin', '/auth/signup'];
  let currentDate = new Date();

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!auth.value.token) {
      next({
        name: 'signin',
      });
    } else {
      const decodeToken = jwtDecode(auth.value.token.access_token);
      if (decodeToken.exp * 1000 < currentDate.getTime()) {
        console.log('need refresh', decodeToken);
        console.log('need refresh', auth.value.token);
        authStore.logout();
      } else {
        console.log('token ok');
        next();
      }
    }
  } else {
    if (to.matched.some((record) => publicPages.includes(record.path))) {
      if (auth.value.token) {
        const decodeToken = jwtDecode(auth.value.token.access_token);
        if (decodeToken.exp * 1000 < currentDate.getTime()) {
          localStorage.removeItem('auth');
          next();
        } else {
          next({
            name: 'home',
          });
        }
      } else {
        next();
      }
    } else {
      next();
    }
  }
});
