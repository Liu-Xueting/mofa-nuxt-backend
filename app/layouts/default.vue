<!-- 默认布局，不包含任何内容 -->
<script setup lang="ts">
const isDev = import.meta.dev
</script>

<template>
  <div id="default-layout">
    <main>
      <slot />
    </main>
    <template v-if="isDev">
      <el-backtop :right="50" :bottom="20" />
    </template>
  </div>
</template>
