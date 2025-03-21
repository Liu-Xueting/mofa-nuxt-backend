<!--
表格卡片
-->
<template>
  <div class="flex flex-col gap-4">
    <div v-if="$slots.header" class="rounded bg-base-100 p-2 shadow-sm lg:p-4">
      <slot name="header" />
    </div>
    <div class="rounded bg-base-100 p-2 shadow-sm lg:p-4">
      <div v-if="$slots.toolbar" class="flex w-full grow justify-between pb-4">
        <slot name="toolbar" />
      </div>
      <div>
        <slot />
      </div>
    </div>
  </div>
</template>
