<template>
  <div
    id="page-container"
    class="relative flex-grow h-full px-6 overflow-y-scroll sm:px-10"
  >
    <div class="h-full max-w-[82rem] pt-8 sm:pt-10">
      <div class="flex items-center">
        <h1 class="text-xl">Account Settings</h1>
        <div class="flex-grow"></div>
      </div>

      <div class="pb-1 overflow-x-auto">
        <div class="sm:border-b">
          <div class="mt-4">
            <div class="">
              <div class="sm:hidden">
                <label for="current-tab" class="sr-only">Select a tab</label>
                <select
                  id="current-tab"
                  name="current-tab"
                  class="block w-full py-2 pl-3 pr-10 text-base border-gray-300 rounded-md focus:border-primary focus:ring-primary focus:outline-none sm:text-sm"
                >
                  <option value="/account">Personal details</option>
                  <option value="/account/password">Change password</option>
                </select>
              </div>
              <div class="hidden sm:block">
                <nav class="flex -mb-px space-x-8">
                  <router-link
                    to="/account"
                    class="px-1 pb-2 text-sm font-medium border-b-2 whitespace-nowrap text-primary-600 border-primary-600"
                    >Personal details</router-link
                  ><router-link
                    to="/account/password"
                    class="px-1 pb-2 text-sm font-medium text-gray-500 border-b-2 border-transparent whitespace-nowrap hover:border-gray-300 hover:text-gray-700"
                    >Change password</router-link
                  >
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="pb-12 mt-4" style="">
        <div class="flex flex-col justify-between gap-4 lg:flex-row">
          <div class="w-full">
            <div class="block text-sm font-medium text-gray-800">
              <h2 class="mt-6 font-medium text-gray-600">
                Personal information
              </h2>
              <p class="mt-2 text-sm text-gray-500">
                Provide your information so we can get in touch with you.
              </p>
            </div>

            <Form
              v-slot="{ errors }"
              :validation-schema="schema"
              class="flex flex-col max-w-lg gap-4 mt-6"
              @submit="onSubmit"
            >
              <UiMessage />

              <div class="flex gap-4">
                <UiInput
                  id="firstName"
                  name="firstName"
                  label="First name"
                  :value="capitalizeFirstLetter(user.firstName)"
                  placeholder="Enter your firstname"
                  :error="errors.firstName"
                />

                <UiInput
                  id="lastName"
                  name="lastName"
                  label="Last name"
                  :value="capitalizeFirstLetter(user.lastName)"
                  placeholder="Enter your lastname"
                  :error="errors.lastName"
                />
              </div>

              <div class="flex gap-4">
                <UiInput
                  id="alias"
                  name="alias"
                  label="Alias"
                  :value="user.alias"
                  placeholder="Enter your alias"
                  :error="errors.alias"
                />
              </div>

              <div class="flex gap-4">
                <UiInput
                  id="email"
                  type="email"
                  name="email"
                  label="Email"
                  :value="user.email"
                  placeholder="Enter your email"
                  :error="errors.email"
                  disabled
                />
              </div>

              <UiButton type="submit" :loading="usersStore.loading"
                >Save changes</UiButton
              >
            </Form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Form } from 'vee-validate';
import * as Yup from 'yup';
import UiButton from '@/components/ui/UiButton.vue';
import UiInput from '@/components/ui/UiInput.vue';
import UiMessage from '@/components/ui/UiMessage.vue';
import { useUsersStore } from '@/stores';
import { storeToRefs } from 'pinia';
import { capitalizeFirstLetter } from '@/helpers/strings';

const schema = Yup.object().shape({
  alias: Yup.string()
    .required('Alias is required')
    .min(4, 'Alias must be at least 4 characters'),
  firstName: Yup.string()
    .required('firstName is required')
    .min(4, 'firstName must be at least 4 characters'),
  lastName: Yup.string()
    .required('lastName is required')
    .min(4, 'lastName must be at least 4 characters'),
});

const usersStore = useUsersStore();
const { user } = storeToRefs(usersStore);

async function onSubmit(values) {
  const profile = { ...user.value, ...values };
  await usersStore.patch(profile);
}
</script>
