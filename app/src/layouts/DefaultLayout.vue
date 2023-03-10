<template>
  <div class="flex h-screen overflow-hidden">
    <div class="flex-none">
      <div
        class="flex flex-col w-64 h-full pt-4 overflow-hidden border-zinc-100 bg-zinc-50"
        style="box-shadow: rgba(0, 0, 0, 0.05) -20px 0px 26px -20px inset"
      >
        <div class="flex-grow px-4 pb-4 overflow-y-auto">
          <div class="mb-4">
            <div>
              <router-link to="/" aria-haspopup="true" aria-expanded="false">
                <div class="flex items-center gap-2">
                  <div class="flex-none">
                    <div class="sj-avatar-container svelte-173satm">
                      <img
                        :src="`https://ui-avatars.com/api/?background=000&amp;color=fff&amp;size=65&amp;font-size=0.3&amp;bold=true&amp;name=${username}`"
                        :alt="username"
                        class="svelte-173satm"
                        referrerpolicy="no-referrer"
                        style="width: 26px; height: 26px"
                      />
                    </div>
                  </div>
                  <div class="flex text-left truncate">
                    <div class="text-sm font-medium truncate">Dashboard</div>
                  </div>
                  <!-- <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide-icon lucide lucide-chevron-down"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg> -->
                </div>
              </router-link>
            </div>
          </div>
          <!-- <div class="mb-4">
            <div
              class="font-heading mb-2 px-2 text-[0.7rem] font-extrabold uppercase tracking-wider text-zinc-400"
            >
              Account
            </div>
            <nav class="flex flex-col gap-0">
              <a
                href="/account"
                class="relative flex items-center gap-3 rounded-md px-2 py-1.5 text-left text-[0.82rem] font-medium text-zinc-600 duration-100 hover:bg-zinc-200/70"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide-icon lucide lucide-inbox text-zinc-500"
                >
                  <polyline
                    points="22 12 16 12 14 15 10 15 8 12 2 12"
                  ></polyline>
                  <path
                    d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"
                  ></path>
                </svg>
                <div>Profile</div>
                <div class="flex-grow"></div>
              </a>
              <button
                type="button"
                class="relative flex items-center gap-3 rounded-md px-2 py-1.5 text-left text-[0.82rem] font-medium text-zinc-600 duration-100 hover:bg-zinc-200/70"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide-icon lucide lucide-import text-zinc-500"
                >
                  <path d="M12 3v12"></path>
                  <path d="m8 11 4 4 4-4"></path>
                  <path
                    d="M8 5H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-4"
                  ></path>
                </svg>
                <div>Import Testimonials</div>
                <div class="flex-grow"></div>
              </button>
            </nav>
          </div>
          <div class="mb-4">
            <div
              class="font-heading mb-2 px-2 text-[0.7rem] font-extrabold uppercase tracking-wider text-zinc-400"
            >
              Manage
            </div>
            <nav class="flex flex-col gap-0">
              <button
                type="button"
                class="relative flex items-center gap-3 rounded-md px-2 py-1.5 text-left text-[0.82rem] font-medium text-zinc-600 duration-100 hover:bg-zinc-200/70"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide-icon lucide lucide-heart text-zinc-500"
                >
                  <path
                    d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"
                  ></path>
                </svg>
                <div>Testimonials</div>
                <div class="flex-grow"></div>
              </button>
              <button
                type="button"
                class="relative flex items-center gap-3 rounded-md px-2 py-1.5 text-left text-[0.82rem] font-medium text-zinc-600 duration-100 hover:bg-zinc-200/70"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide-icon lucide lucide-list text-zinc-500"
                >
                  <line x1="8" y1="6" x2="21" y2="6"></line>
                  <line x1="8" y1="12" x2="21" y2="12"></line>
                  <line x1="8" y1="18" x2="21" y2="18"></line>
                  <line x1="3" y1="6" x2="3.01" y2="6"></line>
                  <line x1="3" y1="12" x2="3.01" y2="12"></line>
                  <line x1="3" y1="18" x2="3.01" y2="18"></line>
                </svg>
                <div>Collections</div>
                <div class="flex-grow"></div>
                <button
                  class="z-1 rounded-md p-0.5 hover:bg-zinc-600/5 rotate-0"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="opacity-100 lucide-icon lucide lucide-chevron-down"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </button>
              </button>
            </nav>
          </div>
          <div class="mb-4">
            <div
              class="font-heading mb-2 px-2 text-[0.7rem] font-extrabold uppercase tracking-wider text-zinc-400"
            >
              Share
            </div>
            <nav class="flex flex-col gap-0">
              <button
                type="button"
                class="relative flex items-center gap-3 rounded-md px-2 py-1.5 text-left text-[0.82rem] font-medium text-zinc-600 duration-100 hover:bg-zinc-200/70"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide-icon lucide lucide-link-2 text-zinc-500"
                >
                  <path d="M9 17H7A5 5 0 0 1 7 7h2"></path>
                  <path d="M15 7h2a5 5 0 1 1 0 10h-2"></path>
                  <line x1="8" y1="12" x2="16" y2="12"></line>
                </svg>
                <div>Wall of Love</div>
                <div class="flex-grow"></div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide-icon lucide lucide-external-link opacity-60"
                >
                  <path
                    d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
                  ></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
              </button>
              <button
                type="button"
                class="relative flex items-center gap-3 rounded-md px-2 py-1.5 text-left text-[0.82rem] font-medium text-zinc-600 duration-100 hover:bg-zinc-200/70"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide-icon lucide lucide-code-2 text-zinc-500"
                >
                  <path d="m18 16 4-4-4-4"></path>
                  <path d="m6 8-4 4 4 4"></path>
                  <path d="m14.5 4-5 16"></path>
                </svg>
                <div>Embeds</div>
                <div class="flex-grow"></div>
              </button>
            </nav>
          </div> -->
        </div>
        <div class="relative">
          <div class="w-full px-4 py-4 text-sm font-medium text-left border-t">
            <div class="flex items-center gap-2">
              <div class="flex flex-col justify-center flex-none w-6 h-6 p-1">
                <img
                  :src="`https://ui-avatars.com/api/?background=000&amp;color=fff&amp;size=65&amp;font-size=0.3&amp;bold=true&amp;name=${username}`"
                  :alt="username"
                  referrerpolicy="no-referrer"
                  style="width: 26px; height: 26px"
                />
              </div>
              <div class="truncate">
                <div v-if="user.alias" class="capitalize truncate">
                  {{ user.alias }}
                </div>
              </div>
              <div class="flex-grow"></div>
              <router-link
                to="/account"
                class="p-1 -mr-1 rounded-md hover:bg-black/5"
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide-icon lucide lucide-settings text-zinc-400"
                >
                  <path
                    d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"
                  ></path>
                  <circle cx="12" cy="12" r="3"></circle></svg
              ></router-link>
              <button
                type="button"
                aria-expanded="false"
                class="p-1 -mr-1 rounded-md hover:bg-black/5"
                @click="handleSignOut"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide-icon lucide lucide-log-out text-zinc-400"
                >
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                  <polyline points="16 17 21 12 16 7"></polyline>
                  <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <router-view></router-view>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useAuthStore, useUsersStore } from '@/stores';

const authStore = useAuthStore();
const usersStore = useUsersStore();
const { user } = storeToRefs(usersStore);

const username = usersStore.getAvatarInitial();

const handleSignOut = () => {
  authStore.logout();
};
</script>
