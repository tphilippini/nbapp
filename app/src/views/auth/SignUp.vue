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
    <h1 class="text-2xl font-medium">{{ $t('generic.welcome') }}</h1>
    <p class="text-gray-500">
      {{ $t('auth.baseline') }}
    </p>

    <!-- <div class="relative mt-4">
      <div class="absolute inset-0 flex items-center" aria-hidden="true">
        <div class="w-full border-t border-gray-300"></div>
      </div>
      <div class="relative flex justify-center text-sm">
        <span class="px-2 text-gray-500 bg-white">or</span>
      </div>
    </div> -->

    <div class="flex flex-col gap-4 mt-2">
      <UiMessage />

      <Form
        v-slot="{ errors }"
        :validation-schema="schema"
        class="flex flex-col gap-4"
        @submit="onSubmit"
      >
        <UiInput
          id="alias"
          name="alias"
          :label="$t('form.alias.label').toString()"
          :placeholder="$t('form.alias.placeholder').toString()"
          :error="errors.alias"
        />

        <UiInput
          id="email"
          type="email"
          name="email"
          :label="$t('form.email.label').toString()"
          :placeholder="$t('form.email.placeholder').toString()"
          :error="errors.email"
        />

        <UiInput
          id="password"
          type="password"
          name="password"
          :label="$t('form.password.label').toString()"
          :placeholder="$t('form.password.placeholder').toString()"
          :error="errors.password"
        />

        <UiButton type="submit" :loading="userStore.loading">{{
          $t('auth.cta.signup')
        }}</UiButton>

        <!-- <button
          type="button"
          class="w-full appearance-none rounded-md border bg-white px-4 py-2.5 text-sm font-medium text-gray-600 shadow-sm hover:bg-zinc-50"
        >
          <div class="relative flex items-center justify-center">
            <div class="duration-100 undefined false">
              <div class="flex items-center justify-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 48 48"
                  width="18"
                  height="18"
                >
                  <defs>
                    <path
                      id="a"
                      d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"
                    ></path>
                  </defs>
                  <clipPath id="b">
                    <use xlink:href="#a" overflow="visible"></use>
                  </clipPath>
                  <path
                    clip-path="url(#b)"
                    fill="#FBBC05"
                    d="M0 37V11l17 13z"
                  ></path>
                  <path
                    clip-path="url(#b)"
                    fill="#EA4335"
                    d="M0 11l17 13 7-6.1L48 14V0H0z"
                  ></path>
                  <path
                    clip-path="url(#b)"
                    fill="#34A853"
                    d="M0 37l30-23 7.9 1L48 0v48H0z"
                  ></path>
                  <path
                    clip-path="url(#b)"
                    fill="#4285F4"
                    d="M48 48L17 24l-4-3 35-10z"
                  ></path>
                </svg>
                <span>Sign up with Google</span>
              </div>
            </div>
            <div
              class="absolute inset-0 flex items-center justify-center opacity-0"
            >
              <div class="">
                <svg
                  id="dots"
                  width="32px"
                  viewBox="0 0 132 58"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  class="svelte-10juqow"
                >
                  <defs></defs>
                  <g
                    id="Page-1"
                    stroke="none"
                    stroke-width="1"
                    fill="none"
                    fill-rule="evenodd"
                  >
                    <g id="dots" fill="currentColor" class="svelte-10juqow">
                      <circle
                        id="dot1"
                        cx="25"
                        cy="30"
                        r="13"
                        class="svelte-10juqow"
                      ></circle>
                      <circle
                        id="dot2"
                        cx="65"
                        cy="30"
                        r="13"
                        class="svelte-10juqow"
                      ></circle>
                      <circle
                        id="dot3"
                        cx="105"
                        cy="30"
                        r="13"
                        class="svelte-10juqow"
                      ></circle>
                    </g>
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </button> -->

        <i18n-t
          keypath="auth.cta.alreadyAnAccountLink"
          scope="global"
          tag="div"
          class="flex justify-start text-sm text-gray-500 gap-x-2"
          for="signup"
        >
          <template #link>
            <router-link to="/auth/signin" class="text-primary-600">
              {{ $t('auth.cta.signin') }}
            </router-link>
          </template>
        </i18n-t>

        <div class="flex items-center justify-start mt-2">
          <i18n-t
            keypath="auth.cta.termsBySignUp"
            scope="global"
            tag="div"
            class="text-xs text-gray-500"
          >
            <template #terms>
              <a
                target="_blank"
                rel="noopener noreferrer"
                class="underline align-baseline"
                href="#terms"
                >{{ $t('terms.conditions') }}</a
              >
            </template>

            <template #privacy>
              <a
                target="_blank"
                rel="noopener noreferrer"
                class="underline align-baseline"
                href="#privacy"
                >{{ $t('terms.privacy') }}</a
              >
            </template>
          </i18n-t>
        </div>
      </Form>
    </div>
  </div>
</template>

<script setup>
import { Form } from 'vee-validate';
import UiInput from '@/components/ui/UiInput.vue';
import UiButton from '@/components/ui/UiButton.vue';
import UiMessage from '@/components/ui/UiMessage.vue';
import UiLangSelect from '@/components/ui/UiLangSelect.vue';
import * as Yup from 'yup';
import { useUsersStore } from '@/stores';

const schema = Yup.object().shape({
  alias: Yup.string()
    .required('Alias is required')
    .min(4, 'Alias must be at least 4 characters')
    .nullable(),
  email: Yup.string().email().required('Email is required').nullable(),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .nullable(),
});

const userStore = useUsersStore();

async function onSubmit(values) {
  await userStore.register(values);
}
</script>
