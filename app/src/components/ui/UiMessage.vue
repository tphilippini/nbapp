<template>
  <div
    v-if="message"
    :class="message.type"
    class="p-4 border rounded-md"
    role="message"
  >
    <strong class="text-sm font-medium whitespace-pre-wrap">{{
      message.text
    }}</strong>
  </div>

  <slot v-else></slot>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useMessageStore } from '@/stores';

const messageStore = useMessageStore();
const { message } = storeToRefs(messageStore);
</script>
