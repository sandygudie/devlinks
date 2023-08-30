<script lang="ts" setup>
import { googleTokenLogin } from 'vue3-google-login'
import { googleLogin } from '@/utilis/api/auth'
import router from '@/router'
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
        return router.push('/')
      }
    } catch (err: any) {
      console.log(err)
      toast.error(err.toString(), {
        position: toast.POSITION.TOP_CENTER,
        bodyClassName: '!text-red '
      })
    } finally {
      isLoading.value = false
    }
  })
}
</script>

<template>
  <span v-if="isLoading">
    <Spinner width="80px" height="80px" />
  </span>
  <div  v-else class="flex items-center justify-center h-screen gap-12 flex-col">
    <img src="@/assets/icons/logo-devlinks-small.svg" alt="devlink logo" width="100" height="100" />
    <button
      @click="login"
      class="shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] hover:shadow-[0_3px_10px_rgb(0,0,0,0.40)] font-extraBold flex items-center rounded-xl px-12 py-3"
    >
      <img src="@/assets/icons/google_icon.webp" alt="devlink logo" width="40" height="40" />
      Sign in with Google
    </button>
  </div>
</template>
