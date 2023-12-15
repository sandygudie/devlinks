<script lang="ts" setup>
import { googleTokenLogin } from 'vue3-google-login'
import { googleLogin } from '@/utilis/api/auth'
import { ref, onMounted } from 'vue'
import Spinner from '../components/Spinner.vue'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import { setToken, setUserID } from '@/utilis'
import { TOKEN_KEY, USERID } from '@/utilis/constants'
import LogoBigIcon from '@/components/icons/LogoFull.vue'
import LogoSmallIcon from '@/components/icons/LogoSmall.vue'

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
      isLoading.value = false
    }
  })
}
</script>

<template>
  <span v-if="isLoading">
    <Spinner width="80px" height="80px" />
  </span>
  <div v-else class="lg:flex block fixed w-full overflow-hidden items-center justify-between">
    <div
      class="text-center h-screen flex items-center md:justify-center flex-col relative text-white text-center px-5 pt-4 lg:p-10 bg-[#2839a3] lg:w-[75%]"
    >
      <div class="absolute top-5 left-5 ">
        <div class="w-36 h-7 ">
          <LogoBigIcon class="text-white" />
        </div>
        <div class="w-10 block lg:hidden h-10">
          <LogoSmallIcon class="text-white" />
        </div>
      </div>
      <div class="flex flex-col mt-16 items-center lg:justify-center lg:h-full">
        <h1 class="text-4xl md:text-6xl font-bold">Stay Connected</h1>
        <p class="text-xl mt-2">Manage your social links in one place.</p>
        <div class="mt-6 mx-auto">
          <img
            className="w-full"
            src="/assets/social-media-collection.svg"
            alt="devlink logo"
            loading="eager"
          />
        </div>
      </div>
      <div class="flex mt-12 flex-col lg:hidden items-center justify-center">
        <p class="text-xl mb-3">Log in to your account.</p>

        <button
          @click="login"
          class="bg-white text-black shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] hover:shadow-[0_3px_10px_rgb(0,0,0,0.40)] font-extraBold flex justify-between items-center rounded-xl px-6 py-2"
        >
          <div class="w-10 h-10">
            <img
              src="@/assets/icons/google_icon.webp"
              alt="devlink logo"
              loading="eager"
              width="40"
              height="40"
            />
          </div>
          Sign in with Google
        </button>
      </div>
    </div>
    <div class="w-1/2 mx-auto hidden lg:block h-screen">
      <div class="flex relative flex-col items-center h-full justify-center">
        <p class="text-xl mb-6">Log in to your account.</p>
        <button
          @click="login"
          class="bg-white text-sm shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] hover:shadow-[0_3px_10px_rgb(0,0,0,0.40)] font-extraBold flex justify-between gap-x-8 items-center rounded-xl pl-4 pr-10 py-2"
        >
          <div class="w-10 h-10">
            <img
              src="@/assets/icons/google_icon.webp"
              alt="devlink logo"
              width="40"
              loading="eager"
              height="40"
            />
          </div>
          <p class="text-sm">Sign in with Google</p>
        </button>
      </div>
    </div>
  </div>
</template>
