<!--
网络状态检查，当用户网络连接断开时阻止用户继续操作。
-->
<script setup lang="ts">
const { isOnline } = useNetwork()

const dialogVisible = ref(true)
</script>

<template>
  <div>
    <div v-if="!isOnline">
      <el-dialog v-model="dialogVisible" title="断开连接..." width="500" :before-close="() => { }" :show-close="false">
        <span>请检查你的网络设置</span>
      </el-dialog>
    </div>
  </div>
</template>
