import { Index, Password } from '@/views/account';

import { Default } from '@/layouts';

export default {
  path: '/account',
  component: Default,
  children: [
    { path: '', component: Index, meta: { requiresAuth: true } },
    { path: 'password', component: Password, meta: { requiresAuth: true } },
    // { path: 'confirm', name: 'confirm', component: Confirm, meta: { requiresAuth: true } },
    // {
    //   path: 'profile',
    //   name: 'profile',
    //   component: Profile,
    //   meta: { requiresAuth: true },
    // },
  ],
};
