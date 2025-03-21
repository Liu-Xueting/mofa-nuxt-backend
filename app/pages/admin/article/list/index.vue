<!--
文章列表
- 生成一个完整的文章列表管理界面，使用 Element Plus，组件已经默认全部导入，请使用 kebab-case 命名。需要使用图标时，可使用 `el-icon` 作为图标组件前缀，如 `<el-icon-user />`。需要提供模拟数据，不要从其他地方导入数据。使用全局对象 `ElMessage` 来弹出消息。
- 全部使用 Tailwind CSS 进行样式布局，不要使用自定义类名。不要给页面添加额外页边距，在表格中需要操作时使用小按钮。顶部操作和搜索栏使用白色卡片包裹。表格需要分页，表格第一列需要是序号列，从 1 开始递增。
- 参照 `schema.prisma` 中的模型 `Article` 来设计模拟数据。
- 不要修改原有代码，从 `INSERT_HERE` 处开始编写。
-->
<script setup lang="ts">
definePageMeta({ layout: 'admin' })

// 文章状态选项
const statusOptions = [
  { label: '已发布', value: 'PUBLISHED' },
  { label: '草稿', value: 'DRAFT' },
  { label: '已下架', value: 'UNPUBLISHED' },
]

// 模拟数据
const mockArticles = Array.from({ length: 50 }, (_, i) => ({
  id: `article_${i + 1}`,
  userId: `user_${Math.floor(Math.random() * 10) + 1}`,
  title: `文章标题 ${i + 1}`,
  content: `这是文章 ${i + 1} 的内容描述...`,
  tags: ['标签1', '标签2'].map(tag => `${tag}_${Math.floor(Math.random() * 3) + 1}`),
  status: statusOptions[Math.floor(Math.random() * statusOptions.length)]!.value,
  isDeleted: false,
  createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(),
  createdBy: `admin_${Math.floor(Math.random() * 5) + 1}`,
  updatedAt: new Date(Date.now() - Math.floor(Math.random() * 1000000000)).toISOString(),
  updatedBy: `admin_${Math.floor(Math.random() * 5) + 1}`,
}))

// 搜索条件
const searchForm = ref({
  keyword: '',
  status: '',
  dateRange: [] as unknown as [Date, Date],
})

// 表格数据
const tableData = ref(mockArticles)
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(mockArticles.length)

// 表格操作
function handleEdit(row: any) {
  ElMessage.success(`编辑文章：${row.title}`)
}

function handleDelete(row: any) {
  ElMessageBox.confirm('确定要删除该文章吗？', '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    tableData.value = tableData.value.filter(item => item.id !== row.id)
    ElMessage.success('删除成功')
  }).catch(() => {})
}

function handleSearch() {
  let filtered = [...mockArticles]

  if (searchForm.value.keyword) {
    filtered = filtered.filter(item =>
      item.title.includes(searchForm.value.keyword)
      || item.content.includes(searchForm.value.keyword),
    )
  }

  if (searchForm.value.status) {
    filtered = filtered.filter(item => item.status === searchForm.value.status)
  }

  if (searchForm.value.dateRange?.length === 2) {
    const [start, end] = searchForm.value.dateRange
    filtered = filtered.filter((item) => {
      const date = new Date(item.createdAt)
      return date >= start && date <= end
    })
  }

  tableData.value = filtered
  total.value = filtered.length
  currentPage.value = 1
}

function handleReset() {
  searchForm.value = {
    keyword: '',
    status: '',
    dateRange: [] as unknown as [Date, Date],
  }
  tableData.value = mockArticles
  total.value = mockArticles.length
  currentPage.value = 1
}

function handleAdd() {
  ElMessage.success('新增文章')
}
</script>

<template>
  <div class="size-page">
    <Head>
      <Title>{{ $t('admin.article.list.title') }}</Title>
    </Head>

    <AdminTableCard>
      <!-- 搜索栏 -->
      <template #header>
        <el-form :model="searchForm" inline>
          <el-form-item label="关键词">
            <el-input
              v-model="searchForm.keyword"
              placeholder="标题/内容"
              clearable
            />
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="searchForm.status" placeholder="请选择" clearable>
              <el-option
                v-for="item in statusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="创建日期">
            <el-date-picker
              v-model="searchForm.dateRange"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSearch">
              <el-icon-search class="mr-1" />
              搜索
            </el-button>
            <el-button @click="handleReset">
              <el-icon-refresh class="mr-1" />
              重置
            </el-button>
          </el-form-item>
        </el-form>
      </template>

      <template #toolbar>
        <el-button type="primary" @click="handleAdd">
          <el-icon-plus class="mr-1" />
          新增文章
        </el-button>
      </template>

      <!-- 表格 -->
      <el-table
        :data="tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
        class="w-full"
        border
      >
        <el-table-column type="index" width="60" align="center" />
        <el-table-column prop="title" label="标题" min-width="200" show-overflow-tooltip />
        <el-table-column prop="content" label="内容" min-width="300" show-overflow-tooltip />
        <el-table-column prop="tags" label="标签" width="150">
          <template #default="{ row }">
            <el-tag
              v-for="tag in row.tags"
              :key="tag"
              class="mb-1 mr-1"
              size="small"
            >
              {{ tag }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="100">
          <template #default="{ row }">
            <el-tag
              :type="row.status === 'PUBLISHED' ? 'success' : row.status === 'DRAFT' ? 'info' : 'warning'"
              size="small"
            >
              {{ statusOptions.find(item => item.value === row.status)?.label }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createdAt" label="创建时间" width="180">
          <template #default="{ row }">
            {{ new Date(row.createdAt).toLocaleString() }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150" fixed="right">
          <template #default="{ row }">
            <el-button size="small" type="primary" @click="handleEdit(row)">
              编辑
            </el-button>
            <el-button size="small" type="danger" @click="handleDelete(row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="mt-4 flex justify-end">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :total="total"
          :page-sizes="[10, 20, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
        />
      </div>
    </AdminTableCard>
  </div>
</template>
