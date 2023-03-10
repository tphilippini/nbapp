import { Default } from '@/layouts';
import { Index } from '@/views/account';

export default {
  path: '/account',
  component: Default,
  children: [
    { path: '', component: Index, meta: { requiresAuth: true } },
    // { path: 'confirm', name: 'confirm', component: Confirm, meta: { requiresAuth: true } },
    // {
    //   path: 'profile',
    //   name: 'profile',
    //   component: Profile,
    //   meta: { requiresAuth: true },
    // },
  ],
};
