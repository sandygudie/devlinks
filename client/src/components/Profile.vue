<script setup lang="ts">
import {logOut} from '@/utilis'
defineProps<{
  handleFirstNameChange: (e: any) => void
  handleLastNameChange: (e: any) => void
  uploadProfileImage: (e: any) => void
  profileLinks: {} | any
}>()

const logoutCurentUser=() =>{
  logOut()
}
</script>

<template>
  <div class="text-gray-200">
    <div>
      <h1 class="font-extraBold text-xl">Profile Details</h1>
      <p class="text-sm text-gray-200">
        Add your details to create a personal touch to your profile.
      </p>
    </div>
    <div
      class="flex flex-col gap-y-3 lg:flex-row mt-8 rounded-lg items-center py-4 px-6 bg-gray-100 justify-center"
    >
      <div class="">
        <div class="rounded-lg w-36 h-36 text-xs relative">
          <img
            v-if="profileLinks.profilepic"
            :src="profileLinks.profilepic"
            class="w-full h-36 object-fit rounded-full border-[1px] border-solid border-gray-400"
            alt="profile-upload"
          />
          <img
            v-else
            src="https://static.vecteezy.com/system/resources/previews/018/765/757/original/user-profile-icon-in-flat-style-member-avatar-illustration-on-isolated-background-human-permission-sign-business-concept-vector.jpg"
            class="w-full opacity-50 lg:h-48 rounded-full"
            alt="profile-upload"
          />

          <div
            class="absolute w-36 h-36 top-0 w-full rounded-full opacity-0 hover:opacity-100 bg-black/70 h-full"
          >
            <label
              class="text-white z-10 cursor-pointer flex h-full flex-col justify-center items-center"
              for="file_input"
            >
              <img src="../assets/icons/icon-upload-image.svg" class="w-8" alt="icon-upload" />
              <p>Change image</p>
            </label>
            <input
              ref="fileInput"
              class="absolute top-20 text-sm invisible w-48"
              id="file_input"
              type="file"
              accept="image/jpeg, image/png, image/jpg"
              @input="uploadProfileImage"
            />
          </div>
        </div>

        <div class="text-gray-500 mt-4 font-bold text-xs">
          <p>Image must be below 1024x1024px</p>
          <p>Use PNG,JPG or BMP format</p>
        </div>
      </div>
    </div>
    <div class="rounded-lg px-4 py-6 md:p-6 mt-6 bg-gray-100">
      <div class="md:flex justify-between items-center">
        <label class="text-sm block mb-2 md:mb-0">First name <sup class="text-xs">*</sup></label>
        <input
          :value="profileLinks.firstname"
          @change="handleFirstNameChange"
          required
          type="text"
          class="focus:border-purple-300 border border-solid border-[1px] outline-none rounded-lg px-4 py-3 max-w-48 w-full md:w-10/12"
        />
      </div>
      <div class="md:flex justify-between items-center my-4">
        <label class="text-sm block mb-2 md:mb-0">Last name <sup class="text-xs">*</sup></label>
        <input
          @change="handleLastNameChange"
          required
          :value="profileLinks.lastname"
          type="text"
          class="focus:border-purple-300 border border-solid border-[1px] outline-none rounded-lg px-4 py-3 max-w-48 w-full md:w-10/12"
        />
      </div>
      <div class="md:flex justify-between items-center">
        <label class="text-sm block mb-2 md:mb-0">Email</label>
        <input
          type="text"
          :value="profileLinks.email"
          readonly
          class="focus:outline-0 opacity-60 rounded-lg px-4 py-3 w-full max-w-48 md:w-10/12"
        />
      </div>
    </div>
    <div class="my-6 w-11/12">
      <button
        :onclick="logoutCurentUser"
        class="bg-red/80 hover:bg-red text-white font-medium rounded-lg py-2 px-6"
      >
        Log out
      </button>
    </div>
  </div>
</template>
