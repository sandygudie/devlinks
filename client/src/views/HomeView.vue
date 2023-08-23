<script setup lang="ts">
import { ref } from 'vue'
import Header from '../components/Header.vue'
import Links from '../components/Links.vue'
import Profile from '../components/Profile.vue'
import Preview from '../components/Preview.vue'
import githubIcon from '/assets/icons/select-icons/icon-github.svg'
import axios from 'axios'
const devLinks = ref<[] | any>([])
const profileLinks = ref<{} | any>({})
const firstname = ref<string>('')
const lastname = ref<string>('')
const email = ref<string>('')
const isLoading = ref<boolean>(false)
const currentUser = ref<any>('')
const selected = ref(new Array(5))
let previewImage = ref('')
const isActive = ref<'links' | 'profile'>('links')
const isDisplay = ref<'editor' | 'preview'>('editor')
import { onMounted } from 'vue'
let { matches } = window.matchMedia('(max-width: 600px)')

onMounted(async () => {
  try {
    isLoading.value = true
    const response = await axios.get('http://localhost:8000/api/v1/auth/google/success', {
      withCredentials: true
    })
    if (response.data.success) {
      firstname.value = response.data.user[0].name.split(' ')[0]
      lastname.value = response.data.user[0].name.split(' ')[1]
      email.value = response.data.user[0].email
    }
  } catch (error: any) {

    console.log(error)
    return window.location.assign('/login')
  }finally{
    isLoading.value = false
  }
})

function toggleActive(active: 'links' | 'profile') {
  isActive.value = active
}
function toggledisplay(display: 'editor' | 'preview') {
  isDisplay.value = display
}

const uploadProfileImage = (e: any) => {
  const file = e.target.files[0]
  previewImage.value = URL.createObjectURL(file)
}

const handleFirstNameChange = (e: { target: { value: any } }) => {
  firstname.value = e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)
}

const handleLastNameChange = (e: { target: { value: any } }) => {
  lastname.value = e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)
}
const addnewLink = () => {
  let itemLink = {
    id: Math.random(),
    name: 'Github',
    link: 'link',
    color: 'black',
    icon: githubIcon,
    linkpath: 'Github'.toLowerCase()
  }
  devLinks.value.push(itemLink)
  selected.value.length--
}
let removeList = (index: number) => {
  devLinks.value.splice(index, 1)
  selected.value.length++
}

const handleSubmit = () => {
  profileLinks.value.profilepic = previewImage
  profileLinks.value.lastname = lastname
  profileLinks.value.devlinks = devLinks
  profileLinks.value.firstname = firstname
}
const handlePlatformChange = (value: any, index: number) => {
  const result = devLinks.value.find((item: { id: number }) => item.id === index)
  result.name = value.label
  result.icon = value.icon
  result.color = value.color
}
const handleLinkChange = (event: any, index: number) => {
  const result = devLinks.value.find((item: { id: number }) => item.id === index)
  result.link = event.target.value
}
</script>
<template>
  <span v-if="isLoading"></span>
  <div v-else>
  <div  class="h-full p-6" v-if="isDisplay === 'editor'">
    <Header
      :toggledisplay="toggledisplay"
      :profileLinks="profileLinks"
      :toggleActive="toggleActive"
      :isActive="isActive"
    />
    <main class="flex justify-between h-full gap-6 my-6 overflow-scroll">
      <div
        v-if="!matches"
        class="bg-white w-5/12 p-8 rounded-lg flex flex-col justify-center h-full items-center relative"
      >
        <div class="absolute h-[430px] w-[200px] bg-white z-20">
          <div class="my-8 mx-auto text-center">
            <img
              v-if="previewImage.length > 0"
              :src="previewImage"
              class="w-20 mx-auto h-20 rounded-full border border-gray-400"
              alt="profile-upload"
            />
            <div v-else class="bg-gray-400 rounded-full w-20 mx-auto h-20"></div>
            <p :class="`text-xs h-3 mt-2  text-sm rounded-lg`">
              {{ firstname + ' ' + lastname }}
            </p>
            <p :class="`text-xs h-3 mt-2  text-sm rounded-lg`">
              {{ email }}
            </p>
          </div>
          <div class="py-3 px-1 my-6">
            <template v-for="item in devLinks" :key="item.id">
              <a
                :href="item.link"
                target="_blank"
                v-if="item.name"
                class="text-sm px-4 flex no-underline justify-between px-1.5 my-3 bg-gray-400 text-white text-sm h-8 rounded-lg"
                :style="{ backgroundColor: item.color }"
              >
                <span class="flex items-center gap-3">
                  <img
                    class="w-3"
                    :src="`/assets/icons/icon-link-boxes/icon-${item.name.toLowerCase()}-link-box.svg`"
                  />
                  {{ item.name }}
                </span>
                <img src="../assets/icons/icon-arrow-right.svg" class="w-4" alt="arrow" />
              </a>
            </template>

            <div
              class="h-8 px-2 my-3 bg-gray-400 rounded-lg"
              v-for="index in selected"
              :key="index"
            ></div>
          </div>
        </div>
        <img
          class="mx-auto"
          src="@/assets/images/illustration-phone-mockup.svg"
          width="250"
          height="180"
          alt="phone view"
        />
      </div>
      <form
        @submit.prevent="handleSubmit"
        :class="`${
          matches ? 'w-full' : 'w-7/12'
        } relative bg-white rounded-lg px-6 pt-6 pb-14 overflow-scroll`"
      >
        <Links
          v-if="isActive === 'links'"
          v-bind:propitems="{
            devLinks: devLinks,
            addnewLink: addnewLink,
            removeList: removeList,
            handlePlatformChange: handlePlatformChange,
            handleLinkChange: handleLinkChange
          }"
        />
        <Profile
          v-else
          :email="email"
          :firstname="firstname"
          :lastname="lastname"
          :handleFirstNameChange="handleFirstNameChange"
          :handleLastNameChange="handleLastNameChange"
          :previewImage="previewImage"
          :uploadProfileImage="uploadProfileImage"
        />

        <div class="mt-8 bg-white">
          <hr class="w-full border-gray-400" />
          <div class="text-right my-4 mx-6">
            <button
              type="submit"
              :disabled="devLinks.length <= 0"
              :class="`${
                devLinks.length > 0 ? 'bg-purple-300' : 'bg-purple-300/20'
              }  px-4 py-2 text-sm text-bold text-white rounded-lg`"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </main>
  </div>
  <Preview
    :toggledisplay="toggledisplay"
    :profileLinks="profileLinks"
    v-else-if="isDisplay === 'preview'"
  />
</div>
</template>

<!-- todo 
  dark mode
  set up eslint
  write documentation
  include link sharing to differnt media platform
  include toast
  bring spinner
  
-->
