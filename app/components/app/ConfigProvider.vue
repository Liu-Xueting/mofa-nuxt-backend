<!--
全局配置组件
-->
<script setup lang="ts">
const { locale } = useI18n()

updateLocale(locale.value)
</script>

<template>
  <el-config-provider :locale="eleLocale[locale]">
    <slot />
  </el-config-provider>
</template>
