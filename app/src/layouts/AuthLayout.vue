<template>
  <div class="grid min-h-screen md:grid-cols-2">
    <div
      class="flex items-center justify-center px-8 pt-12 pb-20 duration-200 md:px-12 lg:px-16"
    >
      <div class="flex-grow max-w-md">
        <router-view />
      </div>
    </div>

    <div class="flex-col justify-center hidden bg-cover bg-primary-600 md:flex">
      <div class="relative mx-auto w-80">Image</div>
    </div>
  </div>
</template>

<script setup>
// import { useAuthStore } from '@/stores';
// import { router } from '@/routes';

// // redirect home if already logged in
// const authStore = useAuthStore();
// if (authStore.user) {
//   router.push('/');
// }
</script>
