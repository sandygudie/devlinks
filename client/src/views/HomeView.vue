<script setup lang="ts">
import { ref } from 'vue'
import Header from '../components/Header.vue'
import Links from '../components/Links.vue'
import Profile from '../components/Profile.vue'
import Preview from '../components/Preview.vue'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
const devLinks = ref<[] | any>([])
const profileLinks = ref<{} | any>({
  firstname: '',
  lastname: '',
  profilepic: '',
  devlinks: [],
  email: ''
})
const firstname = ref<string>('')
const lastname = ref<string>('')
const email = ref<string>('')
const isLoading = ref<boolean>(false)
let userId: string | any
const selected: number = 5
let previewImage = ref('')
const isActive = ref<'links' | 'profile'>('links')
const isDisplay = ref<'editor' | 'preview'>('editor')
import { onMounted } from 'vue'
import { getProfile } from '@/utilis/api/profile'
import { login } from '@/utilis/api/auth'
import router from '@/router'
import { addLink } from '@/utilis/api/link'
import { getUserId, setUserId } from '@/utilis'

let { matches } = window.matchMedia('(max-width: 600px)')

onMounted(async () => {
  isLoading.value = true
  try {
    userId = getUserId()
    if (userId) {
      profile()
    } else {
      const loginResponse = await login()
      console.log(loginResponse)
      if (loginResponse.success) {
        userId = loginResponse.user[0].googleID
        setUserId(userId)
        profile()
      }
    }
  } catch (err: any) {
    toast.error(err.toString(), {
      position: toast.POSITION.TOP_CENTER,
      onClose: () => router.push('/login'),
      bodyClassName: '!text-red '
    })
  } finally {
    isLoading.value = false
  }
})

async function profile() {
  const profileResponse = await getProfile(userId)
  console.log(profileResponse.data[0].name.split(' ')[0])
  if (profileResponse.success) {
    firstname.value = profileResponse.data[0].name.split(' ')[0]
    lastname.value = profileResponse.data[0].name.split(' ')[1]
    email.value = profileResponse.data[0].email
    devLinks.value = profileResponse.data[0].links || []
  }
}
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
 profileLinks.value.firstname = e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)
}

const handleLastNameChange = (e: { target: { value: any } }) => {
  profileLinks.value.lastname = e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)
}
const addnewLink = async () => {
  let itemLink = {
    id: Math.random(),
    name: 'Github',
    link: '',
    color: 'black'
  }
  devLinks.value.push(itemLink)
}
let removeList = (index: number) => {
  devLinks.value.splice(index, 1)
}

const handleSubmit = async () => {
  profileLinks.value.profilepic = previewImage
  profileLinks.value.lastname = lastname
  profileLinks.value.devlinks = devLinks
  profileLinks.value.firstname = firstname
  let userDetails = {
    name: profileLinks.value.firstname + ' ' + profileLinks.value.lastname,
    links: profileLinks.value.devlinks
  }
  try {
    let response = await addLink(userId, userDetails)
    console.log(response)
    toast.success('Link Saved', {
      autoClose: 1000,
      theme: 'auto',
      position: toast.POSITION.BOTTOM_CENTER
    })
  } catch (err: any) {
    toast.error(err.toString(), {
      position: toast.POSITION.TOP_CENTER,
      onClose: () => router.push('/login'),
      bodyClassName: '!text-red '
    })
  }
}
const handlePlatformChange = (value: any, index: number) => {
  const result = devLinks.value.find((item: { id: number }) => item.id === index)
  result.name = value.label
  result.color = value.color
}
const isValidHttpUrl = (str: string) => {
  const pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$', // fragment locator
    'i'
  )
  return pattern.test(str)
}

const handleLinkChange = (event: any, index: number) => {
  // const isValidUrl = isValidHttpUrl(event.target.value)
  // console.log(isValidUrl)
  const result = devLinks.value.find((item: { id: number }) => item.id === index)
  result.link = event.target.value
}
</script>
<template>
  <span v-if="isLoading">loading</span>
  <div v-else class="h-full">
    <div class="h-full p-6" v-if="isDisplay === 'editor'">
      <Header
        :toggledisplay="toggledisplay"
        :devLinks="devLinks"
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
                <div
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
                </div>
              </template>

              <div
                class="h-8 px-2 my-3 bg-gray-400 rounded-lg"
                v-for="n in selected - devLinks.length"
                :key="n"
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
      :email="email"
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
@/utilis/api/profile
