<script setup lang="ts">
import bgImage from '~/assets/images/cover.webp'
</script>

<!-- 登录/注册页面布局 -->
<template>
  <div id="login-layout" class="flex h-screen w-full">
    <!-- left -->
    <div class="glass hidden h-full w-1/2 overflow-hidden bg-indigo-500 lg:flex-center dark:bg-inherit">
      <div class="fixed left-8 top-2 w-32">
        <AppLogo />
      </div>
      <el-image class="max-w-screen-md" :src="bgImage" fit="cover" />
    </div>
    <!-- right -->
    <div class="size-full overflow-hidden lg:w-1/2">
      <!-- top -->
      <div class="fixed right-4 top-2">
        <AppLocaleController />
        <AppThemeController />
      </div>
      <div class="mx-auto h-5/6 w-full max-w-md flex-center">
        <slot />
      </div>
    </div>
  </div>
</template>
