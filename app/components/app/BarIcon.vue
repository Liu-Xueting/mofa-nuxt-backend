<!--
功能图标
-->
<script setup lang="ts">
const props = defineProps<{
  icon: string
  iconClass?: string
}>()
</script>

<template>
  <div class="btn btn-square btn-ghost btn-sm size-8 hover:-translate-y-0.5">
    <Icon class="text-base-content/75" :class="iconClass" :name="props.icon" size="24" />
  </div>
</template>
