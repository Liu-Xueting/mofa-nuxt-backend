<!--
售后列表
- 生成一个完整的售后列表管理界面，使用 Element Plus，组件已经默认全部导入，请使用 kebab-case 命名。需要使用图标时，可使用 `el-icon` 作为图标组件前缀，如 `<el-icon-user />`。需要提供模拟数据，不要从其他地方导入数据。使用全局对象 `ElMessage` 来弹出消息。
- 全部使用 Tailwind CSS 进行样式布局，不要使用自定义类名。不要给页面添加额外页边距，在表格中需要操作时使用小按钮。顶部操作和搜索栏使用白色卡片包裹。
- 参照 `schema.prisma` 中的模型 `AfterSale` 来设计模拟数据。需要显示用户名等用户信息，还有店铺信息等。表格需要分页，表格第一列需要是序号列，从 1 开始递增。
- 不要修改原有代码，从 `INSERT_HERE` 处开始编写。
-->
<script setup lang="ts">
definePageMeta({ layout: 'admin' })

// 模拟数据
const afterSaleList = ref([
  {
    id: 'as001',
    orderId: 'ord001',
    type: 'RETURN',
    status: 'PENDING',
    reason: '商品质量问题',
    handle_time: '2024-01-15T10:00:00Z',
    description: '收到商品后发现有破损',
    createdAt: '2024-01-14T08:30:00Z',
    // 关联信息
    order: {
      totalAmount: '299.00',
      shop: {
        name: '优品商城',
      },
    },
    user: {
      username: 'customer001',
      nickname: '张三',
      phone: '13800138000',
    },
  },
  {
    id: 'as002',
    orderId: 'ord002',
    type: 'REFUND',
    status: 'APPROVED',
    reason: '七天无理由退货',
    handle_time: '2024-01-16T14:20:00Z',
    description: '未使用商品想要退货',
    createdAt: '2024-01-15T09:45:00Z',
    order: {
      totalAmount: '599.00',
      shop: {
        name: '品质生活馆',
      },
    },
    user: {
      username: 'customer002',
      nickname: '李四',
      phone: '13900139000',
    },
  },
])

// 搜索条件
const searchForm = ref({
  keyword: '',
  status: '',
  dateRange: [],
  type: '',
})

// 表格加载状态
const tableLoading = ref(false)

// 状态选项
const statusOptions = [
  { label: '待处理', value: 'PENDING' },
  { label: '已批准', value: 'APPROVED' },
  { label: '已拒绝', value: 'REJECTED' },
]

// 类型选项
const typeOptions = [
  { label: '退货退款', value: 'RETURN' },
  { label: '仅退款', value: 'REFUND' },
]

// 处理搜索
function handleSearch() {
  tableLoading.value = true
  setTimeout(() => {
    tableLoading.value = false
    ElMessage.success('搜索完成')
  }, 1000)
}

// 重置搜索
function resetSearch() {
  searchForm.value = {
    keyword: '',
    status: '',
    dateRange: [],
    type: '',
  }
}

// 处理售后
function handleAfterSale(row: any) {
  ElMessage.success(`处理售后申请: ${row.id}`)
}

// 查看详情
function viewDetail(row: any) {
  ElMessage.info(`查看售后详情: ${row.id}`)
}

// 获取状态标签类型
function getStatusType(status: string) {
  const types = {
    PENDING: 'info',
    APPROVED: 'success',
    REJECTED: 'danger',
  } as const
  return types[status as keyof typeof types] || 'info'
}

// 格式化时间
function formatDate(date: string) {
  return new Date(date).toLocaleString('zh-CN')
}

// 分页相关
const pagination = ref({
  currentPage: 1,
  pageSize: 20,
  total: 100,
})

// 计算序号
function getIndex(index: number): number {
  return (pagination.value.currentPage - 1) * pagination.value.pageSize + index + 1
}

// 处理分页变化
function handlePageChange(page: number) {
  pagination.value.currentPage = page
  handleSearch()
}
</script>

<template>
  <div class="size-page">
    <Head>
      <Title>{{ $t('admin.order.after_sale.title') }}</Title>
    </Head>

    <AdminTableCard>
      <!-- 搜索区域 -->
      <template #header>
        <el-form :model="searchForm" inline>
          <el-form-item label="关键词搜索">
            <el-input
              v-model="searchForm.keyword"
              placeholder="订单号/用户名/手机号"
              clearable
            />
          </el-form-item>
          <el-form-item label="售后状态">
            <el-select v-model="searchForm.status" placeholder="请选择" clearable>
              <el-option
                v-for="item in statusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="售后类型">
            <el-select v-model="searchForm.type" placeholder="请选择" clearable>
              <el-option
                v-for="item in typeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="申请时间">
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
            <el-button @click="resetSearch">
              <el-icon-refresh class="mr-1" />
              重置
            </el-button>
          </el-form-item>
        </el-form>
      </template>

      <template #toolbar>
        <el-button type="primary">
          <el-icon-plus class="mr-1" />添加售后
        </el-button>
      </template>

      <!-- 表格区域 -->
      <el-table
        v-loading="tableLoading"
        :data="afterSaleList"
        border
        class="w-full"
      >
        <el-table-column label="序号" width="80" fixed="left">
          <template #default="{ $index }">
            {{ getIndex($index) }}
          </template>
        </el-table-column>
        <el-table-column label="售后编号" prop="id" width="100" />
        <el-table-column label="订单信息" min-width="200">
          <template #default="{ row }">
            <div>订单号：{{ row.orderId }}</div>
            <div class="text-sm text-gray-500">
              店铺：{{ row.order.shop.name }}
            </div>
            <div class="text-sm text-gray-500">
              金额：¥{{ row.order.totalAmount }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="用户信息" min-width="180">
          <template #default="{ row }">
            <div>{{ row.user.nickname }}（{{ row.user.username }}）</div>
            <div class="text-sm text-gray-500">
              {{ row.user.phone }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="售后类型" prop="type" width="100">
          <template #default="{ row }">
            {{ row.type === 'RETURN' ? '退货退款' : '仅退款' }}
          </template>
        </el-table-column>
        <el-table-column label="申请原因" prop="reason" min-width="150" />
        <el-table-column label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="getStatusType(row.status)">
              {{ row.status === 'PENDING' ? '待处理' : row.status === 'APPROVED' ? '已批准' : '已拒绝' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="申请时间" width="160">
          <template #default="{ row }">
            {{ formatDate(row.createdAt) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150" fixed="right">
          <template #default="{ row }">
            <el-button
              v-if="row.status === 'PENDING'"
              type="primary"
              size="small"
              @click="handleAfterSale(row)"
            >
              处理
            </el-button>
            <el-button size="small" @click="viewDetail(row)">
              详情
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="mt-4 flex justify-end">
        <el-pagination
          background
          layout="total, prev, pager, next"
          :total="pagination.total"
          :current-page="pagination.currentPage"
          :page-size="pagination.pageSize"
          @current-change="handlePageChange"
        />
      </div>
    </AdminTableCard>
  </div>
</template>
