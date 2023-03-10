<template>
  <div class="w-full">
    <label :for="id" class="block text-sm font-medium">
      <div class="flex items-center gap-2">
        {{ label }}
      </div>
    </label>

    <div class="flex w-full mt-2 text-sm duration-200 rounded-md shadow-sm">
      <Field
        :id="id"
        :name="name"
        :type="type"
        :value="value"
        :disabled="disabled"
        class="block flex-grow rounded-r-md border py-2.5 px-2 text-sm disabled:opacity-60 focus:ring-primary-600 focus:border-primary-600 rounded-md"
        :placeholder="placeholder"
        :class="[
          !error ? 'border-gray-300' : 'border-red-600',
          'border-gray-300',
        ]"
      />

      <span
        v-if="icon"
        class="absolute inset-y-0 inline-flex items-center right-4"
      >
        <component :is="icon"></component>
      </span>
    </div>
    <div v-if="error" class="pt-2 text-xs text-red-600">{{ error }}</div>
  </div>
</template>

<script setup>
import { Field } from 'vee-validate';

defineProps({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  icon: {
    type: [String, Object],
    default: null,
  },
  type: {
    type: String,
    default: 'text',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  error: {
    type: String,
    default: null,
  },
  label: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    default: null,
  },
  placeholder: {
    type: String,
    default: '',
  },
});
</script>
