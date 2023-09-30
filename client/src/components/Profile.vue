<script setup lang="ts">
defineProps<{
  handleFirstNameChange: (e: any) => void
  handleLastNameChange: (e: any) => void
  uploadProfileImage: (e: any) => void
  profileLinks: {} | any
}>()
</script>

<template>
  <div class="text-gray-200">
    <div class="">
      <h1 class="font-extrabold text-2xl">Profile Details</h1>
      <p class="text-xs text-gray-200">
        Add your details to create a personal touch to your profile
      </p>
    </div>
    <div class="flex mt-8 rounded-lg items-center py-4 px-6 bg-gray-100 justify-between">
      <p class="text-sm text-gray-200">Profile picture</p>
      <div class="w-8/12 flex gap-5 items-center">
        <div class="rounded-lg text-xs relative">
          <img
            :src="profileLinks.profilepic"
            class="lg:w-48 lg:h-48 rounded-full"
            alt="profile-upload"
          />

          <div class="absolute top-0 w-full rounded-full bg-black/30 h-full">
            <label
              class="text-white flex h-full flex-col justify-center items-center"
              for="file_input"
            >
              <img src="../assets/icons/icon-upload-image.svg" class="w-8" alt="icon-upload" />
              <p>Change image</p>
            </label>
            <input
              ref="fileInput"
              class="absolute top-20 text-sm invisible"
              id="file_input"
              type="file"
              accept="image/jpeg, image/png, image/jpg"
              @input="uploadProfileImage"
            />
          </div>
        </div>

        <div class="text-gray-400 font-bold text-xs">
          <p>Image must be below 1024x1024px</p>
          <p>Use PNG,JPG or BMP format</p>
        </div>
      </div>
    </div>
    <div class="rounded-lg p-6 mt-6 bg-gray-100">
      <div class="flex justify-between items-center">
        <label class="text-sm">First name <sup class="text-xs">*</sup></label>
        <input
          :value="profileLinks.firstname"
          @change="handleFirstNameChange"
          required
          type="text"
          class="focus:outline-purple-300 rounded-lg px-4 py-3 w-8/12"
        />
      </div>
      <div class="flex justify-between items-center my-4">
        <label class="text-sm">Last name <sup class="text-xs">*</sup></label>
        <input
          @change="handleLastNameChange"
          required
          :value="profileLinks.lastname"
          type="text"
          class="focus:outline-purple-300 rounded-lg px-4 py-3 w-8/12"
        />
      </div>
      <div class="flex justify-between items-center">
        <label class="text-sm">Email</label>
        <input
          type="text"
          :value="profileLinks.email"
          readonly
          class="focus:outline-0 opacity-60 rounded-lg px-4 py-3 w-8/12"
        />
      </div>
    </div>
  </div>
</template>
