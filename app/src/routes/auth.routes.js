import {
  ConfirmSignUp,
  ForgotPassword,
  ResetPassword,
  SignIn,
  SignUp,
} from '@/views/auth';

import { AuthLayout } from '@/layouts';

export default {
  path: '/auth',
  component: AuthLayout,
  children: [
    { path: '', redirect: 'signin' },
    // { path: 'login', name: 'login', component: Login },
    { path: 'signin', name: 'signin', component: SignIn },
    { path: 'signup', name: 'signup', component: SignUp },
    { path: 'forgot', name: 'forgot', component: ForgotPassword },
    {
      path: 'reset/:token',
      name: 'reset',
      sensitive: true,
      component: ResetPassword,
    },
    {
      path: 'confirm/:token',
      name: 'confirm',
      sensitive: true,
      component: ConfirmSignUp,
    },
    // {
    //   path: 'profile',
    //   name: 'profile',
    //   component: Profile,
    //   meta: { requiresAuth: true },
    // },
  ],
};
