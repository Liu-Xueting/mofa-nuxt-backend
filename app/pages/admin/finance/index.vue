<!--
财务管理
-->
<script setup lang="ts">
definePageMeta({ layout: 'admin' })

const localePath = useLocalePath()

onMounted(() => {
  navigateTo(localePath('/admin/finance/overview'), { replace: true })
})
</script>

<template>
  <div class="size-page">
    <Head>
      <Title>{{ $t('admin.finance.title') }}</Title>
    </Head>

    <!-- INSERT_HERE -->
  </div>
</template>
