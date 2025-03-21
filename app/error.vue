<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps({
  error: Object as () => NuxtError,
})

onMounted(() => {
  console.error('Error page:', props.error?.stack)
})
</script>

<template>
  <div>
    <el-result icon="error">
      <template #title>
        <div class="text-lg">
          Error: {{ props.error?.statusCode }}
        </div>
      </template>
      <template #sub-title>
        <div class="mockup-code h-80 max-w-[100vw] overflow-auto text-left">
          <pre v-for="line, i in (props.error?.stack?.split('\n') || [])" :key="i"><code>{{ line }}</code></pre>
        </div>
      </template>
      <template #extra>
        <el-button type="primary" @click="$router.back()">
          Back
        </el-button>
        <el-button type="success" @click="$router.replace($localePath('/'))">
          Home
        </el-button>
      </template>
    </el-result>
  </div>
</template>
