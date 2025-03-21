<!--
代理提现
- 生成一个完整的代理提现管理界面，使用 Element Plus，组件已经默认全部导入，请使用 kebab-case 命名。需要使用图标时，可使用 `el-icon` 作为图标组件前缀，如 `<el-icon-user />`。需要提供模拟数据，不要从其他地方导入数据。使用全局对象 `ElMessage` 来弹出消息。
- 全部使用 Tailwind CSS 进行样式布局，不要使用自定义类名。不要给页面添加额外页边距，在表格中需要操作时使用小按钮。顶部操作和搜索栏使用白色卡片包裹。表格需要分页，表格第一列需要是序号列，从 1 开始递增。详情需要包括提现的订单列表和总金额。
- 参照 `schema.prisma` 中的模型 `AgentReceipt` 来设计模拟数据。代理可在订单结算一定周期内提现，发起提现后，需要等待管理员审核，审核通过后，提现金额会打到代理的账户中。
- 不要修改原有代码，从 `INSERT_HERE` 处开始编写。
-->
<script setup lang="ts">
definePageMeta({ layout: 'admin' })

// 模拟数据
const receiptStatusMap = {
  PENDING: { label: '待审核', type: 'warning' },
  APPROVED: { label: '已通过', type: 'success' },
  REJECTED: { label: '已拒绝', type: 'danger' },
} as const

const receiptTypeMap = {
  SETTLE: '结算提现',
  REFUND: '退款提现',
}

interface AgentReceipt {
  id: string
  agentId: string
  agentName: string
  amount: string
  type: keyof typeof receiptTypeMap
  status: keyof typeof receiptStatusMap
  remark?: string
  createdAt: string
}

const mockData: AgentReceipt[] = [
  {
    id: '1',
    agentId: 'agent_001',
    agentName: '北京代理商',
    amount: '12500.00',
    type: 'SETTLE',
    status: 'PENDING',
    createdAt: '2024-01-15 10:30:00',
  },
  {
    id: '2',
    agentId: 'agent_002',
    agentName: '上海代理商',
    amount: '8760.50',
    type: 'SETTLE',
    status: 'APPROVED',
    remark: '已转账',
    createdAt: '2024-01-14 16:45:00',
  },
  {
    id: '3',
    agentId: 'agent_003',
    agentName: '广州代理商',
    amount: '3420.00',
    type: 'REFUND',
    status: 'REJECTED',
    remark: '提供的账户信息有误',
    createdAt: '2024-01-13 09:15:00',
  },
]

// 表格数据
const tableData = ref(mockData)
const total = ref(mockData.length)
const currentPage = ref(1)
const pageSize = ref(10)

// 搜索条件
const searchForm = ref({
  agentName: '',
  status: '',
  type: '',
  dateRange: [],
})

// 详情弹窗
const dialogVisible = ref(false)
const currentReceipt = ref<AgentReceipt | null>(null)

// 处理搜索
function handleSearch() {
  ElMessage.success('搜索条件已更新')
}

// 处理重置
function handleReset() {
  searchForm.value = {
    agentName: '',
    status: '',
    type: '',
    dateRange: [],
  }
}

// 查看详情
function handleDetail(row: AgentReceipt) {
  currentReceipt.value = row
  dialogVisible.value = true
}

// 处理审核
function handleAudit(row: AgentReceipt, isApproved: boolean) {
  const action = isApproved ? '通过' : '拒绝'
  ElMessageBox.confirm(`确定要${action}该提现申请吗？`, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    row.status = isApproved ? 'APPROVED' : 'REJECTED'
    ElMessage.success(`提现申请已${action}`)
  })
}

// 模拟订单数据
const mockOrders = [
  { id: 'order_001', amount: '5000.00', date: '2024-01-10' },
  { id: 'order_002', amount: '4500.00', date: '2024-01-11' },
  { id: 'order_003', amount: '3000.00', date: '2024-01-12' },
]
</script>

<template>
  <div class="size-page">
    <Head>
      <Title>{{ $t('admin.finance.agent_receipt.title') }}</Title>
    </Head>

    <AdminTableCard>
      <template #header>
        <el-form :model="searchForm" inline>
          <el-form-item label="代理商名称">
            <el-input v-model="searchForm.agentName" placeholder="请输入代理商名称" />
          </el-form-item>
          <el-form-item label="提现状态">
            <el-select v-model="searchForm.status" placeholder="请选择状态">
              <el-option v-for="(value, key) in receiptStatusMap" :key="key" :label="value.label" :value="key" />
            </el-select>
          </el-form-item>
          <el-form-item label="提现类型">
            <el-select v-model="searchForm.type" placeholder="请选择类型">
              <el-option v-for="(value, key) in receiptTypeMap" :key="key" :label="value" :value="key" />
            </el-select>
          </el-form-item>
          <el-form-item label="申请时间">
            <el-date-picker
              v-model="searchForm.dateRange" type="daterange" range-separator="至" start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
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

      <!-- 表格 -->
      <el-table :data="tableData" border stripe class="w-full">
        <el-table-column type="index" label="序号" width="80" />
        <el-table-column prop="agentName" label="代理商" />
        <el-table-column prop="amount" label="提现金额">
          <template #default="{ row }">
            <span class="font-medium">¥{{ row.amount }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="type" label="提现类型">
          <template #default="{ row }: { row: { type: keyof typeof receiptTypeMap } }">
            {{ receiptTypeMap[row.type] }}
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态">
          <template #default="{ row }: { row: { status: keyof typeof receiptStatusMap }}">
            <el-tag :type="receiptStatusMap[row.status].type" size="small">
              {{ receiptStatusMap[row.status].label }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createdAt" label="申请时间" />
        <el-table-column prop="remark" label="备注" show-overflow-tooltip />
        <el-table-column label="操作" width="200">
          <template #default="{ row }">
            <el-button size="small" @click="handleDetail(row)">
              <el-icon-view class="mr-1" />详情
            </el-button>
            <template v-if="row.status === 'PENDING'">
              <el-button size="small" type="success" @click="handleAudit(row, true)">
                <el-icon-check class="mr-1" />通过
              </el-button>
              <el-button size="small" type="danger" @click="handleAudit(row, false)">
                <el-icon-close class="mr-1" />拒绝
              </el-button>
            </template>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="mt-4 flex justify-end">
        <el-pagination
          v-model:current-page="currentPage" v-model:page-size="pageSize" :total="total"
          layout="total, prev, pager, next" background
        />
      </div>
    </AdminTableCard>

    <!-- 详情弹窗 -->
    <el-dialog v-model="dialogVisible" title="提现详情" width="600px">
      <template v-if="currentReceipt">
        <div class="space-y-4">
          <div class="flex items-center justify-between rounded bg-gray-50 p-4">
            <span class="text-gray-600">提现总额</span>
            <span class="text-xl font-medium text-primary">¥{{ currentReceipt.amount }}</span>
          </div>
          <div class="space-y-2">
            <div class="mb-2 font-medium">
              关联订单
            </div>
            <el-table :data="mockOrders" border stripe>
              <el-table-column type="index" label="序号" width="80" />
              <el-table-column prop="id" label="订单编号" />
              <el-table-column prop="amount" label="订单金额">
                <template #default="{ row }">
                  ¥{{ row.amount }}
                </template>
              </el-table-column>
              <el-table-column prop="date" label="订单日期" />
            </el-table>
          </div>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
