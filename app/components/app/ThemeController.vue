<!--
主题控制器
-->
<script setup lang="ts">
const { toggleTheme: appToggleTheme } = useAppStore()
const { t } = useI18n()

function toggleTheme() {
  appToggleTheme()
  ElMessage.success(t('menu.switch_theme_success'))
}
</script>

<template>
  <AppBarIcon icon="fluent:dark-theme-24-regular" @click="toggleTheme" />
</template>
