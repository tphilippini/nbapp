<template>
  <div class="flex items-end gap-3">
    <div class="text-2xl font-medium">
      <div
        class="px-2 py-1 text-sm font-medium rounded-lg bg-emerald-50 text-emerald-600"
      >
        Open Beta 🏀
      </div>
    </div>
  </div>
  <div class="flex flex-col w-full gap-2 mt-4">
    <h1 class="text-2xl font-medium">Confirm your account</h1>
    <p class="text-gray-500">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Id atque
      accusantium commodi minima.
    </p>

    <div class="flex flex-col gap-4 mt-4">
      <div v-if="checkLoading">
        <UiMessage>
          <div
            class="p-4 border rounded-md border-sky-900/10 bg-sky-50 text-sky-700"
          >
            <strong class="text-sm font-medium whitespace-pre-wrap">
              <div class="flex items-center justify-start">
                <svg
                  class="w-5 h-5 mr-3 -ml-1 text-sky-700 animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span
                  >Processing the access token verification for confirm
                  account...</span
                >
              </div>
            </strong>
          </div>
        </UiMessage>
      </div>

      <div v-else-if="!checkLoading && !checkSuccess">
        <UiMessage>
          <div
            class="p-4 text-red-700 border rounded-md border-red-900/10 bg-red-50"
          >
            <strong class="text-sm font-medium whitespace-pre-wrap">
              Invalid access token
            </strong>
          </div>
        </UiMessage>
      </div>

      <div
        v-else-if="!checkLoading && checkSuccess"
        class="flex flex-col gap-4"
      >
        <UiMessage>
          <div
            class="p-4 text-green-700 border rounded-md border-green-900/10 bg-green-50"
          >
            <strong class="text-sm font-medium whitespace-pre-wrap">
              L'utilisateur a été confirmé avec succès
            </strong>
          </div>
        </UiMessage>

        <router-link
          to="/auth/signin"
          class="mt-2 bg-primary-600 focus:bg-primary-400 hover:bg-primary-400 block appearance-none rounded-md text-sm font-medium text-white duration-100 focus:outline-none disabled:opacity-75 px-4 py-2.5"
        >
          <div class="relative flex items-center justify-center">
            <div>Sign In</div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import UiMessage from '@/components/ui/UiMessage.vue';
import { useAuthStore } from '@/stores';
import { useRoute } from 'vue-router';
import { ref, onBeforeMount } from 'vue';

const route = useRoute();
const authStore = useAuthStore();
const checkLoading = ref(false);
const checkSuccess = ref(false);
const token = route.params.token;

onBeforeMount(async () => {
  if (token) {
    checkLoading.value = true;
    const response = await authStore.validate('signup', token);
    if (response.success) {
      // call confirm url to patch local.confirmed = true
      const confirmed = await authStore.confirm(token);
      checkLoading.value = false;

      if (confirmed.success) {
        checkSuccess.value = true;
      } else {
        checkSuccess.value = false;
      }
    } else {
      checkLoading.value = false;
      checkSuccess.value = false;
    }
  }
});
</script>
