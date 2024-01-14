<script setup lang="ts">
import AddLink from './AddLink.vue'
defineProps<{
  propitems: {
    errorList: number[]
    devLinks: [] | any
    addnewLink: () => void
    removeList: (index: number) => void
    handlePlatformChange: (value: {}, index: number) => void
    handleLinkChange: (e: any, index: number) => void
  }
}>()
</script>

<template>
  <div class="overflow-y-scroll md:h-[70vh] md:pr-6">
    <div>
      <h1 class="font-extrabold text-2xl text-gray-200">Customize your links</h1>
      <p class="text-sm text-gray-200">
        Add/edit/remove links below and then share all your profiles with the world.
      </p>
    </div>
    <button
      type="button"
      @click="propitems.addnewLink"
      :disabled="propitems.devLinks.length >= 5"
      :class="`${
        propitems.devLinks.length >= 5
          ? 'text-purple-300/20 border-purple-300/20'
          : 'text-purple-300 border-purple-300'
      } my-6 border rounded-lg w-full py-1.5 hover:bg-hover-purle`"
    >
      Add new link
    </button>

    <div v-if="propitems.devLinks.length" class="">
      <AddLink
        v-for="(list, index) in propitems.devLinks"
        :key="list.id"
        v-bind:propitems="{
          errorList: propitems.errorList,
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

  <div class="mt-4 bg-white">
    <hr class="w-full border-gray-400" />
    <div class="text-right my-2 mx-6">
      <input
        value="Save"
        type="submit"
        :disabled="propitems.devLinks.length <= 0 || propitems.devLinks.length >= 5"
        :class="`${
          propitems.devLinks.length < 5 && propitems.devLinks.length > 0
            ? 'bg-purple-300'
            : 'bg-purple-300/20'
        }  px-4 py-2 text-sm text-bold cursor-pointer text-white rounded-lg`"
      />
    </div>
  </div>
</template>
