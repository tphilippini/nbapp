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
                    class="px-1 pb-2 text-sm font-medium text-gray-500 border-b-2 border-transparent whitespace-nowrap hover:border-gray-300 hover:text-gray-700"
                    >Personal details </router-link
                  ><router-link
                    to="/account/password"
                    class="px-1 pb-2 text-sm font-medium border-b-2 whitespace-nowrap text-primary-600 border-primary-600"
                    >Change password
                  </router-link>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="pb-12 mt-4" style="">
        <div class="flex flex-col justify-between gap-4 lg:flex-row">
          <div v-if="hasLocaleAccountMethod" class="w-full">
            <div class="block text-sm font-medium text-gray-800">
              <h2 class="mt-6 font-medium text-gray-600">Change Password</h2>
              <p class="mt-2 text-sm text-gray-500">Changing your password.</p>
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
                  id="password"
                  type="password"
                  name="password"
                  :label="$t('form.password.label').toString()"
                  :placeholder="$t('form.password.placeholder').toString()"
                  :error="errors.password"
                />
              </div>

              <div class="flex gap-4">
                <UiInput
                  id="new_password"
                  type="password"
                  name="new_password"
                  :label="$t('form.password.new').toString()"
                  :placeholder="$t('form.password.newPlaceholder').toString()"
                  :error="errors.new_password"
                />
              </div>

              <div class="flex gap-4">
                <UiInput
                  id="confirm_password"
                  type="password"
                  name="confirm_password"
                  :label="$t('form.password.confirm').toString()"
                  :placeholder="$t('form.password.confirm').toString()"
                  :error="errors.confirm_password"
                />
              </div>

              <UiButton type="submit" :loading="usersStore.loading"
                >Register</UiButton
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

const schema = Yup.object().shape({
  password: Yup.string()
    .required('Actual password is required')
    .min(6, 'Password must be at least 6 characters')
    .nullable(),
  new_password: Yup.string()
    .required('New password is required')
    .min(6, 'Password must be at least 6 characters')
    .nullable(),
  confirm_password: Yup.string()
    .required('Confirm password is required')
    .min(6, 'Confirm password must be at least 6 characters')
    .oneOf([Yup.ref('new_password'), null], 'Passwords must match')
    .nullable(),
});

const usersStore = useUsersStore();
const { user } = storeToRefs(usersStore);

const hasLocaleAccountMethod = user.value.methods.includes('local');

async function onSubmit(values, actions) {
  const profile = { ...user.value, ...values };
  await usersStore.patch(profile, 'password');
  actions.resetForm();
}
</script>
