<template>
  <select
    v-model="$i18n.locale"
    class="block px-3 py-1.5 text-sm capitalize text-gray-600 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded-md transition ease-in-out m-0 focus:text-gray-300 focus:bg-white focus:border-primary-600 focus:outline-none"
  >
    <option
      v-for="locale in $i18n.availableLocales"
      :key="`locale-${locale}`"
      :value="locale"
    >
      {{ locale }}
    </option>
  </select>
</template>
