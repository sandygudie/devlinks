<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  updatedLinks: {} | any
  toggledisplay: (display: 'editor' | 'preview') => void
}>()
const isShare = ref<boolean>(false)

function toggleActive(ele: boolean) {
  isShare.value = ele
}
const referralMessage = 'You can learn more about me here!!'

const SHARE_MENU = [
  {
    name: 'Email',
    icon: '../assets/icons/emailIcon.svg',
    link: `mailto:?subject=Assetbase%20Referral&body=${referralMessage}`
  },
  {
    name: 'Whatsapp',
    icon: '../assets/icons/whatsappIcon.svg',
    link: `https://api.whatsapp.com/send?text=${referralMessage}`
  },
  {
    name: 'Twitter',
    icon: '../assets/icons/twitterIcon.svg',
    link: `https://twitter.com/intent/tweet?text=${referralMessage}`
  },
  {
    name: 'Facebook',
    icon: '../assets/icons/facebookIcon.svg',
    link: `https://www.facebook.com/sharer/sharer.php?quote=${referralMessage}`
  }
]
</script>

<template>
  <div class="bg-white relative h-screen">
    <header class="absolute top-0 w-full bg-purple-300 p-6 h-64 rounded-bl-3xl rounded-br-3xl">
      <div class="relative w-full">
        <div
          class="bg-white absolute w-full z-20 px-4 py-3 rounded-lg flex items-center justify-between"
        >
          <button
            @click="toggledisplay('editor')"
            class="rounded-lg text-purple-300 border border-purple-300 text-sm py-3 px-4"
          >
            Back to Editor
          </button>
          <button
            @click="toggleActive(true)"
            class="rounded-lg text-white bg-purple-300 text-sm py-3 px-4"
          >
            Share Link
          </button>
        </div>
      </div>
    </header>
    <main class="flex pt-40 items-center flex-col h-full justify-center">
      <div class="py-4 px-8 w-72 bg-white rounded-xl shadow-lg">
        <div class="my-2 mx-auto text-center">
          <img
            v-if="updatedLinks.profilepic"
            :src="updatedLinks.profilepic"
            class="w-20 mx-auto h-20 rounded-full"
            alt="profile-upload"
          />
          <div v-else class="bg-gray-400 rounded-full w-20 mx-auto h-20"></div>
          <p class="text-Bold text-xl mx-auto mt-4 `">
            {{ updatedLinks.firstname }} {{ updatedLinks.lastname }}
          </p>
          <p class="mx-auto text-sm mt-1 text-sm`">
            {{ updatedLinks.email }}
          </p>
        </div>
        <div class="mt-8">
          <a
            :href="list.link"
            target="_blank"
            :style="{ backgroundColor: list.color }"
            class="text-white flex justify-between rounded-lg text-sm mb-3 py-3 px-4"
            v-for="list in updatedLinks.devlinks"
            :key="list.id"
          >
            <span class="flex items-center gap-3">
              <img
                class="w-5"
                :src="`/assets/icons/icon-link-boxes/icon-${list.name.toLowerCase()}-link-box.svg`"
              />
              {{ list.name }}
            </span>
            <img src="../assets/icons/icon-arrow-right.svg" class="w-4" alt="arrow" />
          </a>
        </div>
      </div>
    </main>
  </div>
  <div v-if="isShare" class="mt-12 absolute bg-black/10 h-full top-0 w-full">

    <div class="h-full flex justify-center items-center flex-col">
      <div class="bg-black w-60">
        <a
          :href="list.link"
          v-for="(list) in SHARE_MENU"
          :key="list.name"
          class="hover:bg-white hover:text-black text-white border-b py-4 px-6 block"
        >
          <div class="flex items-center gap-6">
            <img class="w-10" :src="list.icon" :alt="list.name" />
            <span class="w-20 text-sm text-left">{{ list.name }}</span>

            <div><img src="../assets/icons/icon-arrow-right.svg" class="w-4" alt="arrow" /></div>
          </div>
        </a>
      </div>
    </div>
    <!-- </div> -->
  </div>
</template>
