<script setup lang="ts">
const { isCollapse } = storeToRefs(useMenuStore())
const { isRefreshing } = storeToRefs(useAppStore())
const { width } = useWindowSize()

watch(() => width.value, () => {
  isCollapse.value = width.value < 1280
}, { immediate: true })

const sidebarWidth = useCssVar('--sidebar-width', undefined, { initialValue: '200px', observe: true })

watch(isCollapse, (value) => {
  sidebarWidth.value = value ? '64px' : '200px'
}, { immediate: true })
</script>

<template>
  <div id="admin-layout">
    <!-- network status -->
    <AdminNetworkStatus />

    <!-- side menu -->
    <AdminSideMenu :collapse="isCollapse" />

    <!-- main content -->
    <div
      class="ml-[var(--sidebar-width)] min-h-screen w-[calc(100%-var(--sidebar-width))] overflow-x-hidden bg-base-200 transition-all duration-300"
    >
      <AdminTopBar />
      <main v-if="!isRefreshing" class="w-[calc(100vw-var(--sidebar-width))] p-4 pt-28 transition-all duration-300">
        <slot />
      </main>
    </div>

    <el-backtop :right="50" :bottom="20" />
  </div>
</template>
