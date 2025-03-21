<!--
侧边菜单栏
-->
<script setup lang="ts">
const props = defineProps<{
  menus?: MenuItemType[]
  level: number
}>()

const { appendTab } = useTabStore()
const route = useRoute()
const { isCollapse } = storeToRefs(useMenuStore())

function navigate(item: MenuItemType) {
  if (item.path) {
    appendTab(item)
  }
}

watch(() => props.menus, () => {
  // 与当前页面一致的，或固定的加入标签页
  props.menus?.forEach((item) => {
    if ((item.path === route.path) || item.meta.isPin) {
      appendTab(item)
    }
  })
}, { immediate: true })
</script>

<template>
  <template v-for="item in props.menus" :key="item.id">
    <el-sub-menu v-if="item.children" :index="`sub-${$localePath(item.path)}` || item.meta.title" :level="props.level">
      <template #title>
        <el-icon>
          <Icon v-if="item.meta.icon" size="20" :name="item.meta.icon" />
        </el-icon>
        <span v-if="!isCollapse">{{ item.meta.title }}</span>
      </template>
      <AdminSubMenu :menus="item.children" :level="props.level + 1" />
    </el-sub-menu>

    <el-menu-item v-else :index="$localePath(item.path) || item.meta.title" :level-item="props.level + 1" @click="navigate(item)">
      <el-icon>
        <Icon v-if="item.meta.icon" size="20" :name="item.meta.icon" />
      </el-icon>
      <template #title>
        <span>{{ item.meta.title }}</span>
        <div v-if="item.meta.showBadge" />
        <div v-if="item.meta.showTextBadge">
          {{ item.meta.showTextBadge }}
        </div>
      </template>
    </el-menu-item>
  </template>
</template>
