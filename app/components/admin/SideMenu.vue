<!--
侧边菜单栏
-->
<script setup lang="ts">
import type { MenuInfo } from '~/api/menu-api'
import { getMenus } from '~/api/menu-api'

const props = defineProps<{
  collapse?: boolean
}>()

const { isCollapse } = storeToRefs(useMenuStore())

const menus = ref<MenuItemType[]>([])

function rec(items: MenuInfo[]): MenuItemType[] {
  return items.map((item) => {
    return {
      id: item.id,
      path: item.path,
      meta: {
        title: item.name,
        icon: item.icon,
        isPin: item.pinned,
      },
      children: item.children ? rec(item.children) : undefined,
    }
  })
}

onMounted(async () => {
  const res = (await getMenus()).data
  menus.value = rec(res)
})
</script>

<template>
  <div class="fixed left-0 top-0 h-screen w-[var(--sidebar-width)] select-none overflow-hidden transition-all duration-300">
    <!-- Logo -->
    <AppLogo :collapse="isCollapse" />
    <!-- Menu -->
    <el-scrollbar class="!h-[calc(100vh-4rem)]">
      <el-menu unique-opened class="h-full overflow-y-auto" :collapse="props.collapse" router :default-active="$localePath($route.path)">
        <AdminSubMenu :menus="menus" :level="0" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>
