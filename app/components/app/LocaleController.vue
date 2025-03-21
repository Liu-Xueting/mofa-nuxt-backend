<!--
语言控制器
-->
<script setup lang="ts">
const { locale, setLocale, t } = useI18n()

function updateLocale(localeCode: GlobalLocale) {
  setTimeout(() => {
    setLocale(localeCode)
    setTimeout(() => {
      ElMessage.success(t('menu.switch_lang_success'))
    }, 300)
  }, 300)
}
</script>

<template>
  <el-dropdown placement="bottom">
    <AppBarIcon icon="fluent:local-language-zi-24-regular" />
    <template #dropdown>
      <el-dropdown-menu class="select-none">
        <el-dropdown-item v-if="locale !== 'zh-CN'" @click="updateLocale('zh-CN')">
          简体中文
        </el-dropdown-item>
        <el-dropdown-item v-else @click="updateLocale('en-US')">
          English (US)
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
