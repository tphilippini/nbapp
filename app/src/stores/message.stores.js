import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useMessageStore = defineStore('message', () => {
  const message = ref(null);

  const success = (text) => {
    message.value = {
      text,
      type: 'border-green-900/10 bg-green-50 text-green-700',
    };
  };

  const warning = (text) => {
    message.value = {
      text,
      type: 'border-amber-900/10 bg-amber-50 text-amber-700',
    };
  };

  const error = (text) => {
    message.value = {
      text,
      type: 'border-red-900/10 bg-red-50 text-red-700',
    };
  };

  const info = (text) => {
    message.value = {
      text,
      type: 'border-sky-900/10 bg-sky-50 text-sky-700',
    };
  };

  const clear = () => {
    setTimeout(() => {
      message.value = null;
    }, 2000);
  };

  return {
    success,
    warning,
    error,
    info,
    clear,
    message,
  };
});
