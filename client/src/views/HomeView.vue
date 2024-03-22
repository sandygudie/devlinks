<script setup lang="ts">
import router from '@/router'
import { ref, onMounted } from 'vue'
import 'vue3-toastify/dist/index.css'
import { toast } from 'vue3-toastify'
import Header from '../components/Header.vue'
import Links from '../components/LinkItem.vue'
import Profile from '../components/Profile.vue'
import Preview from '../components/Preview.vue'
import Spinner from '../components/Spinner.vue'
import ArrowIcon from '../components/icons/ArrowIcon.vue'
import { getProfile, updateProfile } from '@/utilis/api/profile'
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
let shareId = ref<string>('')
onMounted(async () => {
  isLoading.value = true
  let existingUserId = getUserId()
  if (!existingUserId) {
    // return router.push('/login')
  }
  userId = existingUserId
console.log(userId)
  try {
    const profileResponse = await getProfile(userId)

    if (profileResponse.success) {
      profileLinks.value.firstname = profileResponse.data[0].name.split(' ')[0]
      profileLinks.value.lastname = profileResponse.data[0].name.split(' ')[1]
      profileLinks.value.email = profileResponse.data[0].email
      profileLinks.value.devlinks = JSON.parse(profileResponse.data[0].links) || []
      profileLinks.value.profilepic = profileResponse.data[0].profilepic
      updatedLinks = JSON.parse(JSON.stringify(profileLinks.value))
      shareId.value = profileResponse.data[0].shareId
    }

    isLoading.value = false
  } catch (err: any) {
    toast.error(err.toString(), {
      position: toast.POSITION.TOP_RIGHT,
      onClose: () => router.push('/login'),
      bodyClassName: '!text-red '
    })
  }
})

function toggleActive(active: 'links' | 'profile') {
  isActive.value = active
}
function toggledisplay(display: 'editor' | 'preview') {
  if (display === 'editor') {
    toggleActive('links')
  }
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
          position: toast.POSITION.TOP_RIGHT
        })
      }
    } catch (err: any) {
      toast.error(err.toString(), {
        position: toast.POSITION.TOP_RIGHT,
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

  <div v-else class="h-full md:fixed w-full">
    <div class="h-full bg-gray-100" v-if="isDisplay === 'editor'">
      <Header :toggledisplay="toggledisplay" :toggleActive="toggleActive" :isActive="isActive" />
      <main class="lg:flex justify-between gap-6 mt-6 h-[90vh]">
        <div
          class="bg-white w-5/12 p-8 rounded-lg hidden lg:flex flex-col justify-center h-full items-center relative"
        >
          <div class="absolute h-[385px] w-[190px] bg-white z-20">
            <div class="mx-auto text-center">
              <img
                :src="profileLinks.profilepic || previewImage"
                class="w-20 mx-auto h-20 rounded-full border border-gray-400"
                alt="profile-upload"
              />

              <p :class="`mt-2 font-bold rounded-lg`">
                {{ profileLinks.firstname + ' ' + profileLinks.lastname }}
              </p>
              <p :class="`text-xs text-sm rounded-lg`">
                {{ profileLinks.email }}
              </p>
            </div>
            <div class="py-1 px-1 my-2 absolute w-full">
              <template v-for="item in profileLinks.devlinks" :key="item.id">
                <div
                  v-if="item.name"
                  class="text-sm px-4 flex no-underline justify-between items-center px-1.5 my-2 bg-gray-400 text-white text-sm h-9 rounded-lg"
                  :style="{ backgroundColor: item.color }"
                >
                  <span class="flex items-center gap-3">
                    <img
                      class="w-3"
                      :src="`/assets/icons/icon-link-boxes/icon-${item.name.toLowerCase()}-link-box.svg`"
                    />
                    <p class="text-sm">{{ item.name }}</p>
                  </span>
                  <span><ArrowIcon class="text-sm fill-white" /></span>
                </div>
              </template>

              <div
                class="h-9 px-2 my-2 bg-gray-400 rounded-lg"
                v-for="n in selected - profileLinks.devlinks.length"
                :key="n"
              ></div>
            </div>
          </div>
          <img
            class="mx-auto h-[28rem]"
            src="@/assets/images/illustration-phone-mockup.svg"
            width="250"
            height="100"
            alt="phone view"
          />
        </div>
        <form
          @submit.prevent="handleSubmit"
          class="w-full lg:w-7/12 relative bg-white rounded-lg px-4 md:pl-6 pt-6 pb-6 overflow-y-scroll"
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
        </form>
      </main>
    </div>
    <Preview
      :shareId="shareId"
      :toggledisplay="toggledisplay"
      :updatedLinks="updatedLinks"
      v-else-if="isDisplay === 'preview'"
    />
  </div>
</template>
