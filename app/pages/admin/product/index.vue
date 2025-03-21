<!--
商品管理
-->
<script setup lang="ts">
definePageMeta({ layout: 'admin' })

const localePath = useLocalePath()

onMounted(() => {
  navigateTo(localePath('/admin/product/list'), { replace: true })
})
</script>

<template>
  <div class="size-page">
    <Head>
      <Title>{{ $t('admin.product.title') }}</Title>
    </Head>

    <!-- INSERT_HERE -->
  </div>
</template>
