<script setup lang="ts">
import LinkIcon from './icons/IconLink.vue'
import ProfileIcon from './icons/IconProfile.vue'
import IconPreview from './icons/IconPreview.vue'
import LogoBigIcon from '@/components/icons/LogoFull.vue'
import LogoSmallIcon from '@/components/icons/LogoSmall.vue'

defineProps<{
  isActive: string
  toggleActive: (active: 'links' | 'profile') => void
  toggledisplay: (display: 'editor' | 'preview') => void
}>()

</script>
<template>
  <header className="rounded-lg p-3 bg-white flex text-gray-200 h-16 justify-between items-center">
    <div class=" md:hidden">
      <LogoSmallIcon class="text-purple-300" />
    </div>
    <div class="hidden md:inline ">
      <LogoBigIcon  class="text-purple-300" />
    </div>
    <div className="flex gap-2">
      <button
        :class="[isActive === 'links' ? 'active' : 'hover:text-purple-300']"
        class="px-4 py-2 flex gap-1 text-gray rounded-lg text-sm"
        @click="toggleActive('links')"
      >
        <LinkIcon class="md:hidden" />
        <span class="hidden md:inline font-semibold">Links</span>
      </button>
      <button
        :class="[isActive === 'profile' ? 'active' : 'hover:text-purple-300']"
        class="px-4 flex gap-1 py-2 text-gray rounded-lg text-sm"
        @click="toggleActive('profile')"
      >
        <ProfileIcon class="md:hidden" />
        <span class="hidden md:inline font-semibold"> Profile Details</span>
      </button>
    </div>

    <button
      @click="toggledisplay('preview')"
      class="border-purple-300 text-purple-300 hover:bg-purple-300 hover:text-white rounded-lg py-2 px-3 text-sm border"
    >
      <IconPreview class="md:hidden" />
      <span class="hidden md:inline">Preview</span>
    </button>
  </header>
</template>

<style>
.active {
  @apply bg-purple-100 text-purple-300;
}
</style>
