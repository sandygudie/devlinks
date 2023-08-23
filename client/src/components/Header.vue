<script setup lang="ts">
import LinkIcon from './icons/IconLink.vue'
import ProfileIcon from './icons/IconProfile.vue'
import IconPreview from './icons/IconPreview.vue'

defineProps<{
  profileLinks: {}
  isActive: string
  toggleActive: (active: 'links' | 'profile') => void
  toggledisplay: (display: 'editor' | 'preview') => void
}>()
let { matches } = window.matchMedia('(max-width: 600px)')
</script>
<template>
  <header className="rounded-lg p-3 bg-white flex text-gray-200 justify-between items-center">
    <img
      v-if="matches"
      src="@/assets/icons/logo-devlinks-small.svg"
      alt="devlink logo"
      width="25"
      height="25"
    />

    <img
      v-else
      src="@/assets/icons/logo-devlinks-large.svg"
      alt="devlink logo"
      width="125"
      height="125"
    />
    <div className="flex gap-2">
      <button
        :class="[isActive === 'links' ? 'active' : 'hover:text-purple-300']"
        class="px-4 py-2 flex gap-1 text-gray rounded-lg text-sm"
        @click="toggleActive('links')"
      >
        <LinkIcon />
        <span v-if="!matches">Links</span>
      </button>
      <button
        :class="[isActive === 'profile' ? 'active' : 'hover:text-purple-300']"
        class="px-4 flex gap-1 py-2 text-gray rounded-lg text-sm"
        @click="toggleActive('profile')"
      >
        <ProfileIcon />
        <span v-if="!matches"> Profile Details</span>
      </button>
    </div>
    <button
      @click="toggledisplay('preview')"
      :disabled="Object.values(profileLinks).length <= 0"
      :class="`${
        Object.keys(profileLinks).length > 0
          ? 'border-purple-300 text-purple-300 hover:bg-purple-300 hover:text-white'
          : 'text-purple-300/20 border-purple-300/20'
      } rounded-lg py-2 px-3 text-sm  border`"
    >
      <IconPreview v-if="matches" />
      <span v-else>Preview</span>
    </button>
  </header>
</template>

<style>
.active {
  @apply bg-purple-100 text-purple-300;
}
</style>
