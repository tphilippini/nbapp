import { defineStore } from 'pinia';
import { fetchWrapper } from '@/helpers';
import { ref } from 'vue';
import { router } from '@/routes';
import { useMessageStore } from '@/stores';

const baseUrl = `${import.meta.env.VITE_API_URL}/users`;

export const useUsersStore = defineStore(
  'users',
  () => {
    const user = ref(null);
    const loading = ref(false);

    const messageStore = useMessageStore();

    const register = async (data) => {
      try {
        loading.value = true;
        const userResponse = await fetchWrapper.post(baseUrl, data);

        loading.value = false;
        messageStore.success(userResponse.message);
        messageStore.clear();

        setTimeout(() => {
          router.push('/auth/signin');
        }, 2000);
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

    const clear = () => {
      localStorage.removeItem('users');
    };

    const getAvatarInitial = () => {
      let username = user.value.alias;
      if (user.value.firstName && user.value.lastName) {
        username = `${user.value.firstName} ${user.value.lastName}`;
      }

      return username;
    };

    const patch = async (profile, grant = 'update') => {
      try {
        loading.value = true;
        const userResponse = await fetchWrapper.patch(
          `${baseUrl}/${profile.uuid}`,
          {
            ...profile,
            grant_type: grant,
            user_type: 'user',
          }
        );

        const data = userResponse.data[0];

        user.value = {
          uuid: data.uuid,
          email: data.email,
          alias: data.alias,
          firstName: data.firstName,
          lastName: data.lastName,
          methods: data.methods,
        };

        loading.value = false;
        messageStore.success(userResponse.message);

        setTimeout(() => {
          messageStore.clear();
        }, 2000);
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

    // async getAll() {
    //   this.users = { loading: true };
    //   try {
    //     this.users = await fetchWrapper.get(baseUrl);
    //   } catch (error) {
    //     this.users = { error };
    //   }
    // },
    // async getById(id) {
    //   this.user = { loading: true };
    //   try {
    //     this.user = await fetchWrapper.get(`${baseUrl}/${id}`);
    //   } catch (error) {
    //     this.user = { error };
    //   }
    // },
    // async update(id, params) {
    //   await fetchWrapper.put(`${baseUrl}/${id}`, params);

    //   // update stored user if the logged in user updated their own record
    //   const authStore = useAuthStore();
    //   if (id === authStore.user.id) {
    //     // update local storage
    //     const user = { ...authStore.user, ...params };
    //     localStorage.setItem('USER_DATA', JSON.stringify(user));

    //     // update auth user in pinia state
    //     authStore.user = user;
    //   }
    // },
    // async delete(id) {
    //   // add isDeleting prop to user being deleted
    //   this.users.find((x) => x.id === id).isDeleting = true;

    //   await fetchWrapper.delete(`${baseUrl}/${id}`);

    //   // remove user from list after deleted
    //   this.users = this.users.filter((x) => x.id !== id);

    //   // auto logout if the logged in user deleted their own record
    //   const authStore = useAuthStore();
    //   if (id === authStore.user.id) {
    //     authStore.logout();
    //   }
    // },

    return {
      user,
      loading,
      clear,
      register,
      patch,
      getAvatarInitial,
    };
  },
  {
    persist: true,
  }
);
