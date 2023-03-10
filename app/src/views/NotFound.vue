<template>
  <div class="flex items-end gap-3">
    <div class="text-2xl font-medium">
      <div
        class="px-2 py-1 text-sm font-medium rounded-lg bg-emerald-50 text-emerald-600"
      >
        404
      </div>
    </div>
  </div>
  <div class="flex flex-col w-full gap-2 mt-4">
    <h1 class="text-2xl font-medium">Not Found</h1>
    <p class="text-gray-500">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Id atque
      accusantium commodi minima.
    </p>
    <div class="flex flex-col gap-4 mt-4">
      <router-link
        to="/"
        class="mt-2 bg-primary-600 focus:bg-primary-400 hover:bg-primary-400 block appearance-none rounded-md text-sm font-medium text-white duration-100 focus:outline-none disabled:opacity-75 px-4 py-2.5"
      >
        <div class="relative flex items-center justify-center">
          <div class="duration-100">Back</div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script setup></script>
