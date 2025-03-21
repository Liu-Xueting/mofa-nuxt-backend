<!--
顶部菜单
-->
<script setup lang="ts">
import defaultUserIcon from '~/assets/images/user.svg'

const { toggleRefresh } = useAppStore()
const { toggleCollapse } = useMenuStore()
const { user } = storeToRefs(useUserStore())

const route = useRoute()
const routeList = computed(() => {
  const routePath = route.path
  const routePaths = routePath.split('/').filter(Boolean)
  const routeList = routePaths.map((_, index) => routePaths.slice(0, index + 1).join('/'))
  return routeList
})

const { toggle: toggleFullscreen } = useFullscreen()
</script>

<template>
  <div
    class="fixed left-[var(--sidebar-width)] top-0 z-10 h-24 w-[calc(100vw-0.75rem-var(--sidebar-width))] bg-base-200/70 pt-2 backdrop-blur transition-all duration-300"
  >
    <div class="flex h-10 items-center justify-between pl-2 pr-4">
      <!-- left -->
      <div class="flex items-center gap-2">
        <AppBarIcon icon="fluent:list-24-regular" @click="toggleCollapse" />
        <AppBarIcon class="hidden md:flex" icon="fluent:arrow-sync-24-regular" @click="toggleRefresh" />
        <AppBarIcon class="hidden md:flex" icon="fluent:apps-24-regular" />
        <div class="hidden px-2 md:block">
          <el-breadcrumb :separator-icon="ElIconArrowRight" class="flex">
            <el-breadcrumb-item
              v-for="item in routeList" :key="item"
              class="font-normal"
            >
              <NuxtLink :to="$localePath(`/${item}`)" class="text-nowrap">
                {{ $t(`${item.replaceAll('/', '.').replaceAll('-', '_')}.title`) }}
              </NuxtLink>
            </el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </div>
      <!-- right -->
      <div class="gap-2 flex-center">
        <AppBarIcon icon="fluent:full-screen-maximize-24-regular" @click="toggleFullscreen" />
        <el-dropdown placement="bottom">
          <AppBarIcon icon="fluent:alert-24-regular" />
          <template #dropdown>
            <el-card style="max-width: 480px">
              <template #header>
                <div>
                  <span>Card name</span>
                </div>
              </template>
              <p v-for="o in 4" :key="o">
                {{ `List item ${o}` }}
              </p>
              <template #footer>
                Footer content
              </template>
            </el-card>
          </template>
        </el-dropdown>
        <AppBarIcon icon="fluent:settings-24-regular" @click="navigateTo($localePath('/admin/system/'))" />
        <AppLocaleController />
        <AppThemeController />
        <el-avatar :src="user?.avatar || defaultUserIcon" :size="32" />
      </div>
    </div>
    <!-- WorkTab -->
    <div class="mt-2 w-full px-4">
      <AdminWorkTab />
    </div>
  </div>
</template>
