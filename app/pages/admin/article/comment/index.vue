<!--
文章评论
- 生成一个完整的文章评论管理界面，使用 Element Plus，组件已经默认全部导入，请使用 kebab-case 命名。需要使用图标时，可使用 `el-icon` 作为图标组件前缀，如 `<el-icon-user />`。需要提供模拟数据，不要从其他地方导入数据。使用全局对象 `ElMessage` 来弹出消息。
- 全部使用 Tailwind CSS 进行样式布局，不要使用自定义类名。不要给页面添加额外页边距，在表格中需要操作时使用小按钮。顶部操作和搜索栏使用白色卡片包裹。表格需要分页，表格第一列需要是序号列，从 1 开始递增。
- 参照 `schema.prisma` 中的模型 `ArticleComment` 来设计模拟数据。
- 不要修改原有代码，从 `INSERT_HERE` 处开始编写。
-->
<script setup lang="ts">
definePageMeta({ layout: 'admin' })

// INSERT_HERE
</script>

<template>
  <div class="size-page">
    <Head>
      <Title>{{ $t('admin.article.comment.title') }}</Title>
    </Head>
    <p>
      <el-tag type="danger" size="large">
        TODO：第二阶段计划
      </el-tag>
    </p>
    <!-- INSERT_HERE -->
  </div>
</template>
