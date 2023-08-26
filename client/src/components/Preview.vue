<script setup lang="ts">
defineProps<{
  updatedLinks: {} | any
  toggledisplay: (display: 'editor' | 'preview') => void
}>()
</script>

<template>
  <div class="bg-white relative h-screen">
    <header class="absolute top-0 w-full bg-purple-300 p-6 h-64 rounded-bl-3xl rounded-br-3xl">
<div class=" relative w-full">
  <div class="bg-white absolute w-full z-20 px-4 py-3 rounded-lg flex items-center justify-between">
        <button
          @click="toggledisplay('editor')"
          class="rounded-lg text-purple-300 border border-purple-300 text-sm py-3 px-4"
        >
          Back to Editor
        </button>
        <button @click="" class="rounded-lg text-white bg-purple-300 text-sm py-3 px-4">
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
</template>
