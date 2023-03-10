<template>
  <button
    :type="type"
    :disabled="disabled"
    class="mt-2 bg-primary-600 hover:bg-primary-400 block appearance-none rounded-md text-sm font-medium text-white duration-100 focus:outline-none disabled:opacity-75 px-4 py-2.5"
  >
    <div class="flex items-center justify-center">
      <div v-if="!loading"><slot></slot></div>
      <div v-else class="flex items-center justify-center">
        <svg
          class="w-5 h-5 mr-3 -ml-1 text-white animate-spin"
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
        <span>Processing...</span>
      </div>
    </div>
  </button>
</template>

<script setup>
defineProps({
  type: {
    type: String,
    default: 'button',
  },
  disabled: {
    type: Boolean,
    default: null,
  },
  loading: {
    type: Boolean,
    default: false,
  },
});
</script>
