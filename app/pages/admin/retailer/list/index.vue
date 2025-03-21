<!--
门店列表
生成一个完整的门店列表界面，使用 Element Plus，组件已经默认全部导入，请使用 kebab-case 命名。需要使用图标时，可使用 `el-icon` 作为图标组件前缀，如 `<el-icon-user />`。需要提供模拟数据，不要从其他地方导入数据。
全部使用 Tailwind CSS 进行样式布局，不要使用自定义类名，可以使用 Daisy UI 提供的工具类辅助编写样式。
不要修改原有代码，从 `INSERT_HERE` 处开始编写。不要给页面添加额外页边距，在表格中需要操作时使用小按钮。
参照 `schema.prisma` 中的模型 `User` 来设计模拟数据。门店是用户，是一种角色而非店铺，表格内可查看门店订单交易量，交易额。
-->
<script setup lang="ts">
definePageMeta({ layout: 'admin' })

// 模拟数据
interface RetailerUser {
  id: string
  username: string
  nickname?: string
  phone?: string
  email?: string
  status: 'ACTIVE' | 'INACTIVE' | 'FORBIDDEN'
  lastLoginAt?: string
  orderCount: number
  orderAmount: number
}

const searchForm = ref({
  keyword: '',
  status: '',
})

const statusOptions = [
  { label: '全部状态', value: '' },
  { label: '正常', value: 'ACTIVE' },
  { label: '禁用', value: 'INACTIVE' },
  { label: '封禁', value: 'FORBIDDEN' },
]
// 查申请表中已通过的用户id 再用这个id去查用户表数据
const retailers: RetailerUser[] = [
  {
    id: '1',
    username: 'retailer_001',
    nickname: '第一门店',
    phone: '13800138000',
    email: 'retailer1@example.com',
    status: 'ACTIVE',
    lastLoginAt: '2024-01-20 12:30:45',
    orderCount: 156,
    orderAmount: 23680.50,
  },
  {
    id: '2',
    username: 'retailer_002',
    nickname: '快乐门店',
    phone: '13800138001',
    email: 'retailer2@example.com',
    status: 'ACTIVE',
    lastLoginAt: '2024-01-21 09:15:30',
    orderCount: 89,
    orderAmount: 15420.80,
  },
  {
    id: '3',
    username: 'retailer_003',
    nickname: '阳光门店',
    phone: '13800138002',
    status: 'INACTIVE',
    lastLoginAt: '2024-01-15 16:45:20',
    orderCount: 45,
    orderAmount: 8960.30,
  },
]

const tableData = ref(retailers)
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(retailers.length)

function handleSearch() {
  tableData.value = retailers.filter((item) => {
    const matchKeyword = !searchForm.value.keyword
      || item.username.includes(searchForm.value.keyword)
      || item.nickname?.includes(searchForm.value.keyword)
      || item.phone?.includes(searchForm.value.keyword)

    const matchStatus = !searchForm.value.status
      || item.status === searchForm.value.status

    return matchKeyword && matchStatus
  })
  total.value = tableData.value.length
}

// 计算当前行的序号
function getIndex(index: number) {
  return (currentPage.value - 1) * pageSize.value + index + 1
}

function handleReset() {
  searchForm.value = {
    keyword: '',
    status: '',
  }
  handleSearch()
}

function handleStatusChange(row: RetailerUser) {
  ElMessage.success(`状态已更改: ${row.username}`)
}

function formatStatus(status: string): { text: string, type: 'success' | 'info' | 'danger' } {
  const map: Record<string, { text: string, type: 'success' | 'info' | 'danger' }> = {
    ACTIVE: { text: '正常', type: 'success' },
    INACTIVE: { text: '禁用', type: 'info' },
    FORBIDDEN: { text: '封禁', type: 'danger' },
  }
  return map[status] || { text: '未知', type: 'info' }
}

function handleSizeChange(val: number) {
  pageSize.value = val
  handleSearch()
}

function handleCurrentChange(val: number) {
  currentPage.value = val
  handleSearch()
}
</script>

<template>
  <div class="size-page">
    <Head>
      <Title>{{ $t('admin.retailer.list.title') }}</Title>
    </Head>

    <AdminTableCard>
      <template #header>
        <!-- 搜索区域 -->

        <div class="flex items-center gap-4">
          <el-input
            v-model="searchForm.keyword"
            placeholder="搜索门店名称/账号/手机号"
            class="w-64"
            clearable
          >
            <template #prefix>
              <el-icon-search class="text-gray-400" />
            </template>
          </el-input>

          <el-select v-model="searchForm.status" placeholder="状态" class="w-32" clearable>
            <el-option
              v-for="item in statusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>

          <el-button type="primary" @click="handleSearch">
            <el-icon-search class="mr-1" />
            搜索
          </el-button>
          <el-button @click="handleReset">
            <el-icon-refresh class="mr-1" />
            重置
          </el-button>
        </div>
      </template>

      <!-- 表格区域 -->
      <el-table :data="tableData" stripe class="w-full">
        <el-table-column type="index" label="序号" width="80" align="center">
          <template #default="{ $index }">
            {{ getIndex($index) }}
          </template>
        </el-table-column>
        <el-table-column label="门店账号" prop="username" min-width="120" />
        <el-table-column label="门店名称" prop="nickname" min-width="120" />
        <el-table-column label="联系电话" prop="phone" min-width="120" />
        <el-table-column label="邮箱" prop="email" min-width="180" />
        <el-table-column label="状态" min-width="100">
          <template #default="{ row }">
            <el-tag :type="formatStatus(row.status).type" size="small">
              {{ formatStatus(row.status).text }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="订单数" min-width="100">
          <template #default="{ row }">
            <span class="font-mono">{{ row.orderCount }}</span>
          </template>
        </el-table-column>
        <el-table-column label="交易额" min-width="120">
          <template #default="{ row }">
            <span class="font-mono">¥{{ row.orderAmount.toFixed(2) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="最后登录" prop="lastLoginAt" min-width="160" />
        <el-table-column label="操作" fixed="right" width="180">
          <template #default="{ row }">
            <div>
              <el-button
                size="small"
                @click="navigateTo(`/admin/retailer/${row.id}`)"
              >
                详情
              </el-button>
              <el-button
                size="small"
                type="primary"
                @click="handleStatusChange(row)"
              >
                {{ row.status === 'ACTIVE' ? '禁用' : '启用' }}
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="flex justify-end p-4">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :total="total"
          :page-sizes="[10, 20, 50, 100]"
          layout="total, sizes, prev, pager, next"
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </AdminTableCard>
  </div>
</template>
