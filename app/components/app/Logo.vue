<!--
侧边菜单栏
-->
<script setup lang="ts">
const props = defineProps<{
  collapse?: boolean
}>()
</script>

<template>
  <div class="h-16 w-full flex-center">
    <div class="cursor-pointer flex-center" @click="navigateTo($localePath('/'))">
      <Icon name="logos:rollupjs" size="32" />
      <span v-if="!props.collapse" class="overflow-hidden text-nowrap p-2 font-bold text-primary/50">{{ $t('app_name') }}</span>
    </div>
  </div>
</template>
