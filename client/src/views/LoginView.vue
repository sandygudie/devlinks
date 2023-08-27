<script lang="ts" setup>

const googleLoginURL = "https://devlinks-iota.vercel.app/api/v1/auth/google"
</script>

<template>
  <div class="flex items-center justify-center h-screen gap-12 flex-col">
    <img src="@/assets/icons/logo-devlinks-small.svg" alt="devlink logo" width="100" height="100" />
    <a
      class="shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] hover:shadow-[0_3px_10px_rgb(0,0,0,0.40)] font-extraBold flex items-center rounded-xl px-12 py-3"
      :href="googleLoginURL"
      target="_blank"
    >
      <img src="@/assets/icons/google_icon.webp" alt="devlink logo" width="40" height="40" />
      Sign in with Google</a
    >
  </div>
</template>
