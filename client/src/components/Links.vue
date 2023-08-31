<script setup lang="ts">
import AddLink from './AddLink.vue'
defineProps<{
  propitems: {
    errorList:number[]
    devLinks: [] | any
    addnewLink: () => void
    removeList: (index: number) => void
    handlePlatformChange: (value: {}, index: number) => void
    handleLinkChange: (e: any, index: number) => void
  }
}>()

</script>

<template>
  <div>
    <div>
      <h1 class="font-extrabold text-2xl text-gray-200">Customize your links</h1>
      <p class="text-xs text-gray-200">
        Add/edit/remove links below and then share all your profiles with the world
      </p>
    </div>
    <button type="button"
      @click="propitems.addnewLink"
      :disabled="propitems.devLinks.length >= 5"
      :class="`${
        propitems.devLinks.length >= 5
          ? 'text-purple-300/20 border-purple-300/20'
          : 'text-purple-300 border-purple-300'
      } my-8 border rounded-lg w-full py-1.5 hover:bg-hover-purle`"
    >
      Add new link
    </button>

    <div v-if="propitems.devLinks.length" class="">
      <AddLink
        v-for="(list, index) in propitems.devLinks"
        :key="list.id"
        v-bind:propitems="{
             errorList:propitems.errorList,
          removeList: propitems.removeList,
          id: list.id,
          index: index,
          handlePlatformChange: propitems.handlePlatformChange,
          handleLinkChange: propitems.handleLinkChange,
          devLinks: propitems.devLinks
        }"
      />
    </div>
    <div v-else class="p-10 bg-gray-100 rounded-lg">
      <img
        src="../assets/images/illustration-empty.svg"
        class="mx-auto h-60"
        alt="illustration-empty"
      />
    </div>
  </div>
</template>
