<script setup lang="ts">
import { ref } from 'vue'
import CopyIcon from './icons/CopyIcon.vue'
import ArrowIcon from './icons/ArrowIcon.vue'
import EmailIcon from '@/assets/icons/EmailIcon.svg'
import FacebookIcon from '@/assets/icons/FacebookIcon.svg'
import TwitterIcon from '@/assets/icons/TwitterIcon.svg'
import WhatsappIcon from '@/assets/icons/WhatsappIcon.svg'
import { XCircleIcon } from '@heroicons/vue/20/solid'

const props = defineProps<{
  userId: string | any
  updatedLinks: {} | any
  toggledisplay: (display: 'editor' | 'preview') => void
}>()
const isShare = ref<boolean>(false)
const isCopy = ref<boolean>(false)
const baseUrl = import.meta.env.VITE_CLIENT_BASEURL
const username = `${props.updatedLinks.firstname}-${props.updatedLinks.lastname}`
function toggleActive(ele: boolean) {
  isShare.value = ele
}
let linkText = `${baseUrl}/view/${username}-${props.userId}`
const referralMessage = `click on ${linkText} to know more about me!!`

const SHARE_MENU = [
  {
    name: 'Email',
    icon: EmailIcon,
    link: `mailto:?subject=Assetbase%20Referral&body=${referralMessage}`
  },
  {
    name: 'Whatsapp',
    icon: WhatsappIcon,
    link: `https://api.whatsapp.com/send?text=${referralMessage}`
  },
  {
    name: 'Twitter',
    icon: TwitterIcon,
    link: `https://twitter.com/intent/tweet?text=${referralMessage}`
  },
  {
    name: 'Facebook',
    icon: FacebookIcon,
    link: `https://www.facebook.com/sharer/sharer.php?quote=${referralMessage}`
  }
]

async function copyTextToClipboard() {
  try {
    if (navigator?.clipboard?.writeText) {
      await navigator.clipboard.writeText(linkText)
      isCopy.value = true
    }
  } catch (err) {
    return err
  }
}
</script>

<template>
  <div class="bg-white relative h-screen">
    <header class="w-full bg-purple-300 p-6 h-40 rounded-bl-3xl rounded-br-3xl">
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
    <main class="flex items-center flex-col justify-center">
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
          <p class="mx-auto text-sm text-sm`">
            {{ updatedLinks.email }}
          </p>
        </div>
        <div class="mt-4">
          <a
            :href="list.link"
            target="_blank"
            :style="{ backgroundColor: list.color }"
            class="text-white flex justify-between rounded-lg text-sm mb-3 py-[0.6rem] px-4"
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
            <span><ArrowIcon class="text-sm fill-white" /></span>
          </a>
        </div>
      </div>
    </main>
  </div>
  <div v-if="isShare" class="absolute z-40 bg-black/30 h-full top-0 w-full">
    <div class="h-full flex justify-center items-center flex-col">
      <div class="bg-black mt-14 w-72 rounded-lg relative">
        <div class="flex items-center justify-between">
          <p class="text-white px-4 pt-6 pb-2">Share on</p>
          <button class="w-5 mr-5" @click="toggleActive(false)">
            <XCircleIcon class="w-8 h-8 fill-white cursor-pointer" @click="toggleActive(false)" />
          </button>
        </div>

        <a
          target="_blank"
          :href="list.link"
          v-for="list in SHARE_MENU"
          :key="list.name"
          :class="`border-b hover:bg-white hover:text-black text-white border-b py-[0.8rem] px-4 block`"
        >
          <div class="flex items-center justify-between">
            <div class="flex items-center justify-between gap-2">
              <div class="w-8 h-6">
                <img class="w-full h-6" :src="list.icon" :alt="list.name" />
              </div>
              <span class="w-20 text-[0.8rem] text-left">{{ list.name }}</span>
            </div>

            <div><ArrowIcon class="text-sm fill-white" /></div>
          </div>
        </a>
        <div
          @click="copyTextToClipboard"
          class="rounded-b-lg cursor-pointer hover:bg-white hover:text-black text-white py-[0.8rem] px-4 items-center justify-between gap-2 flex"
        >
          <p class="pl-4 text-sm">Copy Url</p>
          <span class="text-sm text-sucess" v-if="isCopy">Copied!</span>
          <CopyIcon :class="`${isCopy ? 'text-sucess' : 'text-shite'}`" />
        </div>
      </div>
    </div>
  </div>
</template>
