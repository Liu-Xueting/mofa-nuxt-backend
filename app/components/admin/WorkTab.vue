<script setup lang="ts">
const { sortedTabs } = storeToRefs(useTabStore())
const { removeOthers, removeAllTabs, removeTab } = useTabStore()
const route = useRoute()
const localePath = useLocalePath()

function closeOthers() {
  removeOthers(route.path)
  ElMessage.success('关闭成功')
}

function closeAll() {
  removeAllTabs()
  navigateTo(localePath('/admin/dashboard'))
  ElMessage.success('全部关闭成功')
}

function closeTab(tab: MenuItemType) {
  removeTab(tab.id)
}
</script>

<template>
  <div class="flex w-full justify-between gap-2">
    <el-scrollbar>
      <div class="flex select-none gap-1 pb-2">
        <el-tag
          v-for="tab in sortedTabs" :key="tab.id" :closable="!tab.meta.isPin" size="large" class="h-8"
          :type="tab.path === $route.path ? 'primary' : 'info'"
          @close="closeTab(tab)"
          @click="navigateTo($localePath(tab.path))"
        >
          {{ tab.meta.title || tab.path }}
        </el-tag>
      </div>
    </el-scrollbar>
    <el-dropdown placement="bottom-end">
      <el-button class="size-8">
        <Icon name="fluent:chevron-down-24-regular" size="24" />
      </el-button>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item :icon="ElIconClose" @click="closeOthers">
            关闭其他
          </el-dropdown-item>
          <el-dropdown-item :icon="ElIconCircleClose" @click="closeAll">
            全部关闭
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>
