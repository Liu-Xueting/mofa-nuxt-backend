<!--
代理管理
- 生成一个完整的代理列表管理界面，使用 Element Plus，组件已经默认全部导入，请使用 kebab-case 命名。需要使用图标时，可使用 `el-icon` 作为图标组件前缀，如 `<el-icon-user />`。需要提供模拟数据，不要从其他地方导入数据。使用全局对象 `ElMessage` 来弹出消息。
- 全部使用 Tailwind CSS 进行样式布局，不要使用自定义类名。不要给页面添加额外页边距，在表格中需要操作时使用小按钮。顶部操作和搜索栏使用白色卡片包裹。表格需要分页，表格第一列需要是序号列，从 1 开始递增。
- 参照 `schema.prisma` 中的模型 `Agent` 来设计模拟数据。
- 不要修改原有代码，从 `INSERT_HERE` 处开始编写。
-->
<script setup lang="ts">
definePageMeta({ layout: 'admin' })

interface Agent {
  id: string
  name: string
  phone: string | null
  province: string | null
  city: string | null
  district: string | null
  street: string | null
  address: string | null
  status: string | null
  remark: string | null
  createdAt: string
}

// 模拟数据
const mockAgents: Agent[] = [
  {
    id: '1',
    name: '北京代理商',
    phone: '13800138000',
    province: '北京市',
    city: '北京市',
    district: '朝阳区',
    street: '建国路',
    address: '建国路88号',
    status: 'active',
    remark: '重要客户',
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    name: '上海代理商',
    phone: '13900139000',
    province: '上海市',
    city: '上海市',
    district: '浦东新区',
    street: '陆家嘴',
    address: '陆家嘴88号',
    status: 'inactive',
    remark: '',
    createdAt: '2024-01-16',
  },
]

const searchForm = ref({
  name: '',
  phone: '',
  status: '',
})

const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(100)

const statusOptions = [
  { value: 'active', label: '正常' },
  { value: 'inactive', label: '停用' },
]

function handleSearch() {
  ElMessage.success('搜索成功')
}

function handleReset() {
  searchForm.value = {
    name: '',
    phone: '',
    status: '',
  }
}

function handleAdd() {
  ElMessage.success('点击了添加按钮')
}

function handleEdit(row: Agent) {
  ElMessage.success(`编辑代理商：${row.name}`)
}

function handleDelete(row: Agent) {
  ElMessage.warning(`删除代理商：${row.name}`)
}

function handleCurrentChange(val: number) {
  currentPage.value = val
}

function handleSizeChange(val: number) {
  pageSize.value = val
}
</script>

<template>
  <div class="size-page">
    <Head>
      <Title>{{ $t('admin.agent.list.title') }}</Title>
    </Head>

    <AdminTableCard>
      <template #header>
        <!-- 搜索区域 -->
        <el-form :model="searchForm" inline>
          <el-form-item label="代理商名称">
            <el-input v-model="searchForm.name" placeholder="请输入代理商名称" clearable />
          </el-form-item>
          <el-form-item label="联系电话">
            <el-input v-model="searchForm.phone" placeholder="请输入联系电话" clearable />
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="searchForm.status" placeholder="请选择状态" clearable>
              <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSearch">
              <el-icon-search class="mr-1" />搜索
            </el-button>
            <el-button @click="handleReset">
              <el-icon-refresh class="mr-1" />重置
            </el-button>
          </el-form-item>
        </el-form>
      </template>

      <template #toolbar>
        <el-button type="primary" @click="handleAdd">
          <el-icon-plus class="mr-1" />新增代理商
        </el-button>
      </template>

      <!-- 表格区域 -->

      <el-table :data="mockAgents" border stripe>
        <el-table-column type="index" label="序号" width="60" align="center" />
        <el-table-column prop="name" label="代理商名称" min-width="120" />
        <el-table-column prop="phone" label="联系电话" width="120" />
        <el-table-column label="地址" min-width="200">
          <template #default="{ row }">
            {{ [row.province, row.city, row.district, row.street, row.address].filter(Boolean).join(' ') }}
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="row.status === 'active' ? 'success' : 'info'">
              {{ row.status === 'active' ? '正常' : '停用' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注" min-width="120" />
        <el-table-column prop="createdAt" label="创建时间" width="100" />
        <el-table-column label="操作" width="150" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" size="small" @click="handleEdit(row)">
              <el-icon-edit class="mr-1" />编辑
            </el-button>
            <el-button type="danger" size="small" @click="handleDelete(row)">
              <el-icon-delete class="mr-1" />删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="mt-4 flex justify-end">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 50, 100]"
          :total="total"
          layout="total, sizes, prev, pager, next"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </AdminTableCard>
  </div>
</template>
