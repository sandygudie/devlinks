<script lang="ts" setup>
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import { ref, onMounted } from 'vue'
import { getProfile } from '@/utilis/api/profile';
import { useRoute } from 'vue-router'
import Spinner from '../components/Spinner.vue'
const profileLinks = ref<{} | any>({
  firstname: '',
  lastname: '',
  profilepic: '',
  devlinks: [],
  email: ''
})
const isLoading = ref<boolean>(false)
  const route = useRoute(); 
 

onMounted(async () => {
  let id:any= route.params.id
  let userId = id.slice(15)

  isLoading.value = true
  try {
    const profileResponse = await getProfile(userId)
    if (profileResponse.success) {
      profileLinks.value.firstname = profileResponse.data[0].name.split(' ')[0]
      profileLinks.value.lastname = profileResponse.data[0].name.split(' ')[1]
      profileLinks.value.email = profileResponse.data[0].email
      profileLinks.value.devlinks = profileResponse.data[0].links || []
      profileLinks.value.profilepic = profileResponse.data[0].profilepic

    }
  } catch (err: any) {
    toast.error(err.toString(), {
      position: toast.POSITION.TOP_CENTER,
      bodyClassName: '!text-red '
    })
  } finally {
    isLoading.value = false
  }
})
let { matches } = window.matchMedia('(max-width: 600px)')

</script>

<template>
  <span v-if="isLoading">
    <Spinner width="80px" height="80px" />
  </span>
    <div
          v-if="!matches"
          class="bg-white p-8 rounded-lg flex flex-col justify-center h-screen items-center relative"
        >
          <div class="absolute h-[430px] w-[200px] bg-white z-20">
            <div class="my-6 mx-auto text-center">
              <img
                :src="profileLinks.profilepic"
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
</template>
