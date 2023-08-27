<script lang="ts" setup>
let { MODE } = import.meta.env

const googleLogin =
  MODE === 'development'
    ? 'http://localhost:8000/api/v1/auth/google'
    : 'https://devlinks-api.onrender.com/api/v1/auth/google'
</script>

<template>
  <div class="flex items-center justify-center h-screen gap-12 flex-col">
    <img src="@/assets/icons/logo-devlinks-small.svg" alt="devlink logo" width="100" height="100" />
    <a
      class="shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] hover:shadow-[0_3px_10px_rgb(0,0,0,0.40)] font-extraBold flex items-center rounded-xl px-12 py-3"
      :href="googleLogin"
      target="_self"
    >
      <img src="@/assets/icons/google_icon.webp" alt="devlink logo" width="40" height="40" />
      Sign in with Google</a
    >
  </div>
</template>
