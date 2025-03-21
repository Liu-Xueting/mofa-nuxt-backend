<script setup lang="ts">
definePageMeta({ layout: 'admin' })

const localePath = useLocalePath()

onMounted(() => {
  navigateTo(localePath('/admin/order/list'), { replace: true })
})
</script>

<template>
  <div class="size-page">
    <Head>
      <Title>{{ $t('admin.order.title') }}</Title>
    </Head>
  </div>
</template>
