<script setup lang="ts">
import { ref } from 'vue'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/vue/20/solid'
import linkIcon from '../assets/icons/icon-link.svg'

defineProps<{
  propitems: {
    id: number
    index: number
    devLinks: any
    errorList: number[]
    removeList: (index: number) => void
    handlePlatformChange: (value: {}, index: number) => void
    handleLinkChange: (e: any, index: number) => void
  }
}>()

const isDropdown = ref<boolean>(false)

const linkOptions = [
  { label: 'GitHub', value: 'github', color: 'black' },
  { label: 'LinkedIn', value: 'linkedin', color: '#0b66c3' },
  { label: 'Twitter', value: 'twitter', color: '#1d9bf0' },
  { label: 'Facebook', value: 'facebook', color: '#1877f2' },
  { label: 'Gitlab', value: 'gitlab', color: '#7758c2' },
  { label: 'Hashnode', value: 'hashnode', color: 'black' },
  { label: 'Twitch', value: 'twitch', color: '#8b44f7' },
  { label: 'Youtube', value: 'youtube', color: '#ff0000' },
  { label: 'frontendmentor', value: 'frontendmentor', color: 'white' },
  { label: 'freecodecamp', value: 'freecodecamp', color: 'black' },
  { label: 'Devto', value: 'devto', color: 'black' },
  { label: 'Codepen', value: 'codepen', color: 'black' },
  { label: 'Codewars', value: 'codewars', color: '#ff4d4d' },
  { label: 'Stackoverflow', value: 'stackoverflow', color: '#0a95ff' }
]
const toogleDropdown = () => {
  isDropdown.value = !isDropdown.value
}
</script>

<template>
  <div class="p-4 mb-6 rounded-lg text-gray-200 bg-gray-100">
    <div class="flex justify-between items-center">
      <h2 class="font-semibold">Link #{{ propitems.index + 1 }}</h2>
      <button
        @click="propitems.removeList(propitems.index)"
        class="hover:text-purple-200 border-none text-sm"
      >
        Remove
      </button>
    </div>

    <div class="pt-3">
      <label class="text-xs py-1 block">Platform</label>
      <div class="w-full relative">
        <div
          @click="toogleDropdown()"
          class="px-4 py-2.5 bg-white w-full rounded-lg border border-gray-400 border-[1px]"
        >
          <span class="flex items-center gap-3">
            <img
              :src="`/assets/icons/select-icons/icon-${propitems.devLinks[
                propitems.index
              ].name.toLowerCase()}.svg`"
              alt="option.value"
            />

            {{ propitems.devLinks[propitems.index].name }}
          </span>
          <span class="absolute right-5 top-3">
            <ChevronDownIcon v-if="isDropdown" class="w-5 ml-auto" />
            <ChevronUpIcon v-else class="w-5 ml-auto" />
          </span>
        </div>

        <div
          v-show="isDropdown"
          class="absolute top-14 left-0 w-full bg-white z-20 border-gray-100 border rounded-lg"
        >
          <span
            @click="propitems.handlePlatformChange(option, propitems.id), toogleDropdown()"
            class="hover:bg-purple-100 flex px-3 text-sm py-3 items-center gap-3 border border-b-[1px] border-x-0 border-t-0 border-gray-100"
            v-for="option in linkOptions"
            :key="option.value"
          >
            <img :src="`/assets/icons/select-icons/icon-${option.value}.svg`" alt="option.value" />
            {{ option.label }}
          </span>
        </div>
      </div>
    </div>
    <div class="pt-3">
      <label class="text-xs py-1 block">Link</label>
      <div class="relative">
        <img class="absolute z-10 w-5 left-4 top-3" :src="linkIcon" alt="link" />
        <input
          type="url"
          @change="propitems.handleLinkChange($event, propitems.id)"
          :class="`${
            propitems.errorList.includes(propitems.id) ? 'border-red' : 'border-none'
          } focus-visible:outline-purple-300 py-3 w-full px-14 text-sm rounded-lg border border-gray-400 border-[1px]`"
          :value="propitems.devLinks[propitems.index].link"
        />
        <span class="text-red text-xs" v-if="propitems.errorList.includes(propitems.id)"
          >Add link</span
        >
      </div>
    </div>
  </div>
</template>
