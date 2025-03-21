<!--
代理管理
-->
<script setup lang="ts">
definePageMeta({ layout: 'admin' })

const localePath = useLocalePath()

onMounted(() => {
  navigateTo(localePath('/admin/agent/list'), { replace: true })
})
</script>

<template>
  <div class="size-page">
    <Head>
      <Title>{{ $t('admin.agent.title') }}</Title>
    </Head>

    <!-- INSERT_HERE -->
  </div>
</template>
