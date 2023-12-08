<script lang="ts" setup>
import { googleTokenLogin } from 'vue3-google-login'
import { googleLogin } from '@/utilis/api/auth'
import { ref, onMounted } from 'vue'
import Spinner from '../components/Spinner.vue'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import { setToken, setUserID } from '@/utilis'
import { TOKEN_KEY, USERID } from '@/utilis/constants'

const isLoading = ref<boolean>(false)

onMounted(async () => {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USERID)
})
const login = () => {
  googleTokenLogin().then(async (response: any) => {
    try {
      isLoading.value = true
      let result = await googleLogin({ token: response.access_token })
      if (result.success) {
        setToken(result.accessToken)
        setUserID(result.userID)
        return window.location.replace('/')
      }
    } catch (err: any) {
      toast.error(err.toString(), {
        position: toast.POSITION.TOP_RIGHT,
        bodyClassName: '!text-red '
      })
    }
  })
}
</script>

<template>
  <span v-if="isLoading">
    <Spinner width="80px" height="80px" />
  </span>
  <div v-else class="md:flex block overflow-hidden relative items-center justify-between">
    <div
      class="text-center h-screen  flex items-center justify-center flex-col relative text-white text-center px-5 pt-4 md:p-10 bg-[#2839a3] md:w-[75%]">
      <img className="w-10 block absolute top-5 left-5 md:hidden" src="@/assets/icons/logo-devlinks-small.svg"
        alt="devlink logo" loading="eager" width="100" height="100" />
      <div class="flex flex-col items-center md:justify-center md:h-full mt-4 md:mt-0">
        <h1 class="text-4xl md:text-6xl font-bold">Stay Connected</h1>
        <p class="text-xl mt-2">Manage your social links in one place.</p>
        <img className="w-[30rem] mx-auto mt-8" src="@/assets/images/social-media-collection.svg" alt="devlink logo"
          loading="eager" width="100" height="100" />
      </div>
      <div class="flex mt-12 flex-col md:hidden items-center justify-center">
        <p class="text-xl mb-3">Log in to your account.</p>

        <button @click="login"
          class="bg-white text-black shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] hover:shadow-[0_3px_10px_rgb(0,0,0,0.40)] font-extraBold flex justify-between items-center rounded-xl px-6 py-2">
          <img src="@/assets/icons/google_icon.webp" alt="devlink logo" width="40" height="40" />
          Sign in with Google
        </button>
      </div>
    </div>

    <div class="w-1/2 mx-auto hidden md:block h-screen">
      <img className="w-36 absolute top-10 right-10" src="@/assets/icons/logo-devlinks-large.svg" alt="devlink logo"
        loading="eager" width="100" height="100" />
      <div class="flex relative flex-col items-center h-full justify-center">
        <p class="text-xl mb-6">Log in to your account.</p>

        <button @click="login"
          class="bg-white text-sm shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] hover:shadow-[0_3px_10px_rgb(0,0,0,0.40)] font-extraBold flex justify-between gap-x-8 items-center rounded-xl pl-4 pr-10 py-2">
          <img src="@/assets/icons/google_icon.webp" alt="devlink logo" width="40" height="40" />
          Sign in with Google
        </button>
      </div>
    </div>
  </div>
</template>
