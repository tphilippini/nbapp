import { useMessageStore, useUsersStore } from '@/stores';

import { defineStore } from 'pinia';
import { fetchWrapper } from '@/helpers';
import { ref } from 'vue';
import { router } from '@/routes';

const baseUrl = `${import.meta.env.VITE_API_URL}/auth`;

export const useAuthStore = defineStore(
  'auth',
  () => {
    const auth = ref({
      token: null,
    });
    const loading = ref(false);

    const usersStore = useUsersStore();
    const messageStore = useMessageStore();

    const login = async (email, password) => {
      try {
        loading.value = true;
        const token = await fetchWrapper.post(`${baseUrl}/token`, {
          email,
          password,
          grant_type: 'password',
          user_type: 'user',
        });
        const data = token.data[0];

        // update pinia user state
        usersStore.user = {
          uuid: data.uuid,
          email: data.email,
          alias: data.alias,
          firstName: data.firstName,
          lastName: data.lastName,
          methods: data.methods,
        };

        auth.value.token = {
          access_token: data.access_token,
          client_id: data.client_id,
          refresh_token: data.refresh_token,
        };

        loading.value = false;
        messageStore.success(token.message);
        // redirect to previous url or default to home page
        router.push('/');
      } catch (error) {
        loading.value = false;

        if (error.errors.length) {
          messageStore.error(error.errors[0].message);
        } else {
          messageStore.error('Désolé, une erreur est survenue...');
        }

        messageStore.clear();
      }
    };

    const forgot = async (email) => {
      try {
        loading.value = true;
        const response = await fetchWrapper.post(`${baseUrl}/forgot`, {
          email,
          grant_type: 'forgot',
          user_type: 'user',
        });

        loading.value = false;
        messageStore.success(response.message);
        messageStore.clear();
        return response;
      } catch (error) {
        loading.value = false;
        if (error.errors) {
          messageStore.error(error.errors[0].message);
        } else {
          messageStore.error('Désolé, une erreur est survenue...');
        }
        messageStore.clear();
      }
    };

    const validate = async (type, token) => {
      try {
        const response = await fetchWrapper.post(`${baseUrl}/validate`, {
          token,
          type,
          grant_type: 'validate',
          user_type: 'user',
        });
        return response;
      } catch (error) {
        return error;
      }
    };

    const reset = async (data) => {
      try {
        loading.value = true;
        const response = await fetchWrapper.post(`${baseUrl}/reset`, {
          ...data,
          grant_type: 'reset',
          user_type: 'user',
        });

        loading.value = false;
        messageStore.success(response.message);
        messageStore.clear();
        // redirect to previous url or default to home page
        router.push('/auth/signin');
      } catch (error) {
        loading.value = false;
        if (error.errors) {
          messageStore.error(error.errors[0].message);
        } else {
          messageStore.error('Désolé, une erreur est survenue...');
        }
        messageStore.clear();
      }
    };

    const confirm = async (token) => {
      try {
        loading.value = true;
        const response = await fetchWrapper.post(`${baseUrl}/confirm`, {
          token,
          grant_type: 'confirm',
          user_type: 'user',
        });

        loading.value = false;
        messageStore.success(response.message);
        messageStore.clear();
        return response;
      } catch (error) {
        loading.value = false;
        if (error.errors) {
          messageStore.error(error.errors[0].message);
        } else {
          messageStore.error('Désolé, une erreur est survenue...');
        }
        messageStore.clear();
      }
    };

    const logout = () => {
      localStorage.removeItem('auth');
      localStorage.removeItem('users');
      router.go({ name: 'signin' });
    };

    return {
      auth,
      loading,
      login,
      logout,
      forgot,
      validate,
      reset,
      confirm,
    };
  },
  {
    persist: true,
  }
);
