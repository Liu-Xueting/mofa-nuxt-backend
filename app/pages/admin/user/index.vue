<!--
用户管理模板
-->
<script setup lang="ts">
definePageMeta({ layout: 'admin' })

const localePath = useLocalePath()

onMounted(() => {
  navigateTo(localePath('/admin/user/list'), { replace: true })
})
</script>

<template>
  <div class="size-page">
    <Head>
      <Title>{{ $t('admin.user.title') }}</Title>
    </Head>
  </div>
</template>
