<template>
  <div class="flex items-end justify-between gap-3">
    <div class="text-2xl font-medium">
      <div
        class="px-2 py-1 text-sm font-medium rounded-lg bg-emerald-50 text-emerald-600"
      >
        Open Beta 🏀
      </div>
    </div>
    <UiLangSelect />
  </div>
  <div class="flex flex-col w-full gap-2 mt-4">
    <h1 class="text-2xl font-medium">{{ $t('auth.forgot') }}</h1>
    <p class="text-gray-500">
      {{ $t('auth.baseline') }}
    </p>

    <div class="flex flex-col gap-4 mt-4">
      <UiMessage />

      <Form
        v-slot="{ errors }"
        :validation-schema="schema"
        class="flex flex-col gap-4"
        @submit="onSubmit"
      >
        <UiInput
          id="email"
          type="email"
          name="email"
          :label="$t('form.email.label').toString()"
          :placeholder="$t('form.email.placeholder').toString()"
          :error="errors.email"
        />

        <UiButton type="submit" :loading="authStore.loading">{{
          $t('auth.cta.reset')
        }}</UiButton>

        <div class="flex items-center justify-between">
          <i18n-t
            keypath="auth.cta.noAccountLink"
            scope="global"
            tag="div"
            class="flex justify-center text-sm text-gray-500 gap-x-2"
            for="signup"
          >
            <template #link>
              <router-link to="/auth/signup" class="text-primary-600">
                {{ $t('auth.cta.signup') }}
              </router-link>
            </template>
          </i18n-t>

          <div class="flex justify-center text-sm">
            <router-link to="/auth/signin" class="text-primary-600">{{
              $t('auth.cta.signin')
            }}</router-link>
          </div>
        </div>
      </Form>
    </div>
  </div>
</template>

<script setup>
import { Form } from 'vee-validate';
import * as Yup from 'yup';
import UiButton from '@/components/ui/UiButton.vue';
import UiInput from '@/components/ui/UiInput.vue';
import UiLangSelect from '@/components/ui/UiLangSelect.vue';
import UiMessage from '@/components/ui/UiMessage.vue';
import { useAuthStore } from '@/stores';

const schema = Yup.object().shape({
  email: Yup.string().email().required('Email is required').nullable(),
});

const authStore = useAuthStore();

async function onSubmit(values) {
  const { email } = values;
  await authStore.forgot(email);
}
</script>
