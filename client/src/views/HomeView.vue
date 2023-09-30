<script setup lang="ts">
import router from '@/router'
import { ref, onMounted } from 'vue'
import Header from '../components/Header.vue'
import Links from '../components/LinkItem.vue'
import Profile from '../components/Profile.vue'
import Preview from '../components/Preview.vue'
import Spinner from '../components/Spinner.vue'
import { getProfile, updateProfile } from '@/utilis/api/profile'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import { getUserId, removeDuplicates } from '@/utilis'

interface ProfileLinks {
  firstname: string
  lastname: string
  profilepic: string
  devlinks: [{ id: number; name: string; link: string; color: string }]
  email: string
}

const profileLinks = ref<ProfileLinks>({
  firstname: '',
  lastname: '',
  profilepic: '',
  devlinks: [
    {
      id: 0,
      name: '',
      link: '',
      color: ''
    }
  ],
  email: ''
})

let updatedLinks: { firstname: string; lastname: string; profilepic: any; devlinks: any }
let errorList = ref<number[]>([])
const isLoading = ref<boolean>(true)
let userId: string | any
const selected: number = 5
let previewImage = ref('')
const isActive = ref<'links' | 'profile'>('links')
const isDisplay = ref<'editor' | 'preview'>('editor')

let { matches } = window.matchMedia('(max-width: 600px)')

onMounted(async () => {
  isLoading.value = true
  let existingUserId = getUserId()
  if (!existingUserId) {
    return router.push('/login')
  }
  userId = existingUserId

  try {
    const profileResponse = await getProfile(userId)
    if (profileResponse.success) {
      profileLinks.value.firstname = profileResponse.data[0].name.split(' ')[0]
      profileLinks.value.lastname = profileResponse.data[0].name.split(' ')[1]
      profileLinks.value.email = profileResponse.data[0].email
      profileLinks.value.devlinks = profileResponse.data[0].links || []
      profileLinks.value.profilepic = profileResponse.data[0].profilepic
      updatedLinks = JSON.parse(JSON.stringify(profileLinks.value))
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

function toggleActive(active: 'links' | 'profile') {
  isActive.value = active
}
function toggledisplay(display: 'editor' | 'preview') {
  isDisplay.value = display
}

const uploadProfileImage = (e: any) => {
  const file = e.target.files[0]
  profileLinks.value.profilepic = URL.createObjectURL(file)
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
  profileLinks.value.devlinks.push(itemLink)
}
let removeList = (index: number) => {
  profileLinks.value.devlinks.splice(index, 1)
  if (profileLinks.value.devlinks.length <= 0) {
    handleSubmit()
  }
}

const handleSubmit = async () => {
  profileLinks.value.devlinks.map((ele: any) =>
    ele.link === '' ? errorList.value.push(ele.id) : null
  )
  errorList.value = removeDuplicates(errorList.value)

  if (!errorList.value.length) {
    updatedLinks = JSON.parse(JSON.stringify(profileLinks.value))
    let userDetails = {
      name: updatedLinks.firstname + ' ' + updatedLinks.lastname,
      profilepic: updatedLinks.profilepic,
      links: updatedLinks.devlinks
    }
    try {
      let response = await updateProfile(userId, userDetails)
      if (response.success) {
        toast.success('Updated!', {
          autoClose: 1000,
          theme: 'auto',
          position: toast.POSITION.BOTTOM_CENTER
        })
      }
    } catch (err: any) {
      toast.error(err.toString(), {
        position: toast.POSITION.TOP_CENTER,
        onClose: () => router.push('/login'),
        bodyClassName: '!text-red '
      })
    }
  }
}
const handlePlatformChange = (value: any, index: number) => {
  const result = profileLinks.value.devlinks.find((item: { id: number }) => item.id === index)!
  result.name = value.label
  result.color = value.color
}

const handleLinkChange = (event: any, index: number) => {
  errorList.value.includes(index) && event.target.value !== ' '
    ? errorList.value.splice(index)
    : null
  const result = profileLinks.value.devlinks.find((item: { id: number }) => item.id === index)!
  result.link = event.target.value
}
</script>
<template>
  <span v-if="isLoading">
    <Spinner width="80px" height="80px" />
  </span>
  <div v-else class="h-full">
    <div class="h-full p-6" v-if="isDisplay === 'editor'">
      <Header :toggledisplay="toggledisplay" :toggleActive="toggleActive" :isActive="isActive" />
      <main class="flex justify-between h-screen gap-6 mt-6">
        <div
          v-if="!matches"
          class="bg-white w-5/12 p-8 rounded-lg flex flex-col justify-center h-full items-center relative"
        >
          <div class="absolute h-[430px] w-[200px] bg-white z-20">
            <div class="my-6 mx-auto text-center">
              <img
                :src="profileLinks.profilepic || previewImage"
                class="w-20 mx-auto h-20 rounded-full border border-gray-400"
                alt="profile-upload"
              />
              <!-- <div v-else class="bg-gray-400 rounded-full w-20 mx-auto h-20"></div> -->
              <p :class="`mt-2 font-bold rounded-lg`">
                {{ profileLinks.firstname + ' ' + profileLinks.lastname }}
              </p>
              <p :class="`text-xs text-sm rounded-lg`">
                {{ profileLinks.email }}
              </p>
            </div>
            <div class="py-1 px-1 my-2">
              <template v-for="item in profileLinks.devlinks" :key="item.id">
                <div
                  v-if="item.name"
                  class="text-sm px-4 flex no-underline justify-between px-1.5 my-4 bg-gray-400 text-white text-sm h-8 rounded-lg"
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
                v-for="n in selected - profileLinks.devlinks.length"
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
          } relative bg-white rounded-lg px-6 pt-6 pb-14 overflow-y-scroll`"
        >
          <Links
            v-if="isActive === 'links'"
            v-bind:propitems="{
              errorList: errorList,
              devLinks: profileLinks.devlinks,
              addnewLink: addnewLink,
              removeList: removeList,
              handlePlatformChange: handlePlatformChange,
              handleLinkChange: handleLinkChange
            }"
          />
          <Profile
            v-else
            :profileLinks="profileLinks"
            :handleFirstNameChange="handleFirstNameChange"
            :handleLastNameChange="handleLastNameChange"
            :uploadProfileImage="uploadProfileImage"
          />

          <div class="mt-8 bg-white">
            <hr class="w-full border-gray-400" />
            <div class="text-right my-4 mx-6">
              <input
                value="Save"
                type="submit"
                :disabled="profileLinks.devlinks.length <= 0"
                :class="`${
                  profileLinks.devlinks.length > 0 ? 'bg-purple-300' : 'bg-purple-300/20'
                }  px-4 py-2 text-sm text-bold cursor-pointer text-white rounded-lg`"
              />
            </div>
          </div>
        </form>
      </main>
    </div>
    <Preview
      :userId="userId"
      :toggledisplay="toggledisplay"
      :updatedLinks="updatedLinks"
      v-else-if="isDisplay === 'preview'"
    />
  </div>
</template>

<!-- todo 
  dark mode
  set up eslint
  write documentation
  include link sharing to differnt media platform
drag and drop -->
