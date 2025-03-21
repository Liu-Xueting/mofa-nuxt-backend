<!--
交易列表
- 生成一个完整的交易列表管理界面，使用 Element Plus，组件已经默认全部导入，请使用 kebab-case 命名。需要使用图标时，可使用 `el-icon` 作为图标组件前缀，如 `<el-icon-user />`。需要提供模拟数据，不要从其他地方导入数据。使用全局对象 `ElMessage` 来弹出消息。
- 全部使用 Tailwind CSS 进行样式布局，不要使用自定义类名。不要给页面添加额外页边距，在表格中需要操作时使用小按钮。顶部操作和搜索栏使用白色卡片包裹。表格需要分页，表格第一列需要是序号列，从 1 开始递增。
- 参照 `schema.prisma` 中的模型 `Transaction` 来设计模拟数据。交易可包含多个订单，可在表格中放置子项，用于展示订单列表。
- 不要修改原有代码，从 `INSERT_HERE` 处开始编写。
-->
<script setup lang="ts">
definePageMeta({ layout: 'admin' })

// 模拟交易数据
const transactions = ref([
  {
    id: '1',
    amount: '1299.00',
    time: '2024-01-15 14:30:00',
    type: 'PAYMENT',
    status: 'SUCCESS',
    remark: '正常支付',
    orders: [
      { id: 'O001', totalAmount: '699.00', status: 'PAID', orderedAt: '2024-01-15 14:29:00' },
      { id: 'O002', totalAmount: '600.00', status: 'PAID', orderedAt: '2024-01-15 14:29:30' },
    ],
  },
  {
    id: '2',
    amount: '2499.00',
    time: '2024-01-14 16:20:00',
    type: 'PAYMENT',
    status: 'SUCCESS',
    remark: '批量支付',
    orders: [
      { id: 'O003', totalAmount: '1499.00', status: 'PAID', orderedAt: '2024-01-14 16:19:00' },
      { id: 'O004', totalAmount: '1000.00', status: 'PAID', orderedAt: '2024-01-14 16:19:30' },
    ],
  },
])

// 搜索条件
const searchForm = ref({
  transactionId: '',
  timeRange: [],
  status: '',
  type: '',
})

// 分页
const pagination = ref({
  currentPage: 1,
  pageSize: 10,
  total: 2,
})

// 表格展开行
const expandedRows = ref([])

// 状态选项
const statusOptions = [
  { label: '成功', value: 'SUCCESS' },
  { label: '失败', value: 'FAILED' },
  { label: '处理中', value: 'PROCESSING' },
]

// 交易类型选项
const typeOptions = [
  { label: '支付', value: 'PAYMENT' },
  { label: '退款', value: 'REFUND' },
]

// 搜索方法
function handleSearch() {
  ElMessage.success('搜索条件已更新')
}

// 重置搜索
function handleReset() {
  searchForm.value = {
    transactionId: '',
    timeRange: [],
    status: '',
    type: '',
  }
  ElMessage.success('搜索条件已重置')
}

// 查看详情
function handleView(row: any) {
  ElMessage.info(`查看交易详情：${row.id}`)
}

// 导出数据
function handleExport() {
  ElMessage.success('数据导出中...')
}
</script>

<template>
  <div class="size-page">
    <Head>
      <Title>{{ $t('admin.finance.transaction.title') }}</Title>
    </Head>

    <AdminTableCard>
      <!-- 搜索栏 -->
      <template #header>
        <el-form :model="searchForm" inline>
          <el-form-item label="交易编号">
            <el-input
              v-model="searchForm.transactionId"
              placeholder="请输入交易编号"
              clearable
            />
          </el-form-item>
          <el-form-item label="交易时间">
            <el-date-picker
              v-model="searchForm.timeRange"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
          </el-form-item>
          <el-form-item label="交易状态">
            <el-select v-model="searchForm.status" placeholder="请选择" clearable>
              <el-option
                v-for="item in statusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="交易类型">
            <el-select v-model="searchForm.type" placeholder="请选择" clearable>
              <el-option
                v-for="item in typeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
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

      <!-- 表格工具栏 -->
      <div class="mb-4">
        <div class="flex items-center justify-between">
          <div class="text-lg font-medium">
            交易记录
          </div>
          <el-button type="primary" @click="handleExport">
            <el-icon-download class="mr-1" />
            导出
          </el-button>
        </div>
      </div>

      <!-- 表格 -->
      <el-table
        :data="transactions"
        border
        stripe
        :expand-row-keys="expandedRows"
        row-key="id"
      >
        <el-table-column type="index" width="60" align="center" />
        <el-table-column label="交易编号" prop="id" min-width="120" />
        <el-table-column label="交易金额" prop="amount" min-width="120">
          <template #default="{ row }">
            <span class="text-orange-500">￥{{ row.amount }}</span>
          </template>
        </el-table-column>
        <el-table-column label="交易时间" prop="time" min-width="160" />
        <el-table-column label="交易类型" prop="type" min-width="120">
          <template #default="{ row }">
            <el-tag :type="row.type === 'PAYMENT' ? 'success' : 'warning'">
              {{ row.type === 'PAYMENT' ? '支付' : '退款' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="交易状态" prop="status" min-width="120">
          <template #default="{ row }">
            <el-tag :type="row.status === 'SUCCESS' ? 'success' : 'danger'">
              {{ row.status === 'SUCCESS' ? '成功' : '失败' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="备注" prop="remark" min-width="160" />
        <el-table-column label="操作" width="100" fixed="right">
          <template #default="{ row }">
            <el-button size="small" type="primary" @click="handleView(row)">
              查看
            </el-button>
          </template>
        </el-table-column>
        <template #expand="{ row }">
          <div class="px-4 py-2">
            <div class="mb-2 text-gray-600">
              关联订单
            </div>
            <el-table :data="row.orders" border size="small">
              <el-table-column label="订单编号" prop="id" min-width="120" />
              <el-table-column label="订单金额" prop="totalAmount" min-width="120">
                <template #default="{ row: orderRow }">
                  <span class="text-orange-500">￥{{ orderRow.totalAmount }}</span>
                </template>
              </el-table-column>
              <el-table-column label="订单状态" prop="status" min-width="120">
                <template #default="{ row: orderRow }">
                  <el-tag size="small" type="success">
                    {{ orderRow.status }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column label="下单时间" prop="orderedAt" min-width="160" />
            </el-table>
          </div>
        </template>
      </el-table>

      <!-- 分页 -->
      <div class="mt-4 flex justify-end">
        <el-pagination
          v-model:current-page="pagination.currentPage"
          v-model:page-size="pagination.pageSize"
          :total="pagination.total"
          background
          layout="total, prev, pager, next, jumper"
        />
      </div>
    </AdminTableCard>
  </div>
</template>
