<script setup lang="ts">
const localePath = useLocalePath()

onMounted(() => {
  if (!import.meta.dev) {
    navigateTo(localePath('/login'), { replace: true })
  }
})
</script>

<template>
  <div class="w-full overflow-hidden">
    <el-button @click="navigateTo($localePath('/login'))">
      登录
    </el-button>
    <el-button :icon="ElIconEditPen" type="primary" @click="navigateTo($localePath('/admin'))">
      主页
    </el-button>
    <el-button :icon="ElIconEditPen" type="info" @click="navigateTo($localePath('/docs'))">
      文档
    </el-button>
  </div>
</template>
