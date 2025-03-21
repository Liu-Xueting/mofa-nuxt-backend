<!--
ECharts 图表
-->
<script setup lang="ts">
defineProps<{
  option: ECOption
}>()

const chart = useTemplateRef('chart')

function hideToolbox() {
  chart.value?.setOption({ toolbox: { show: false } })
}
function showToolbox() {
  chart.value?.setOption({ toolbox: { show: true } })
}
</script>

<template>
  <VChart ref="chart" :option="option" class="size-80" autoresize @native:mouseenter="showToolbox()" @globalout="hideToolbox()" />
</template>
