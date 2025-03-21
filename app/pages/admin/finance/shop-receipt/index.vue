<!--
商家提现
- 生成一个完整的商家提现管理界面，使用 Element Plus，组件已经默认全部导入，请使用 kebab-case 命名。需要使用图标时，可使用 `el-icon` 作为图标组件前缀，如 `<el-icon-user />`。需要提供模拟数据，不要从其他地方导入数据。使用全局对象 `ElMessage` 来弹出消息。
- 全部使用 Tailwind CSS 进行样式布局，不要使用自定义类名。不要给页面添加额外页边距，在表格中需要操作时使用小按钮。顶部操作和搜索栏使用白色卡片包裹。表格需要分页，表格第一列需要是序号列，从 1 开始递增。详情需要包括提现的订单列表和总金额。
- 参照 `schema.prisma` 中的模型 `AgentReceipt` 来设计模拟数据。商家可在订单结算一定周期内提现，发起提现后，需要等待管理员审核，审核通过后，提现金额会打到商家的账户中。
- 不要修改原有代码，从 `INSERT_HERE` 处开始编写。
-->
<script setup lang="ts">
definePageMeta({ layout: 'admin' })

// 模拟数据
const tableData = ref([
  {
    id: '1',
    shopId: 'SHOP_001',
    shopName: '优品商城',
    amount: '5000.00',
    type: 'BANK',
    status: 'PENDING',
    remark: '5月份订单结算',
    createdAt: '2024-01-15 10:30:00',
    createdBy: 'USER_001',
    updatedAt: '2024-01-15 10:30:00',
  },
  {
    id: '2',
    shopId: 'SHOP_002',
    shopName: '品质优选',
    amount: '3500.00',
    type: 'ALIPAY',
    status: 'APPROVED',
    remark: '4月份订单结算',
    createdAt: '2024-01-14 15:20:00',
    createdBy: 'USER_002',
    updatedAt: '2024-01-15 09:00:00',
  },
])

// 分页数据
const pagination = ref({
  currentPage: 1,
  pageSize: 10,
  total: 100,
})

// 搜索表单
const searchForm = ref({
  shopName: '',
  status: '',
  dateRange: [],
})

// 详情对话框
const detailDialog = ref(false)
const currentDetail = ref<any>(null)

// 状态选项
const statusOptions = [
  { label: '待审核', value: 'PENDING' },
  { label: '已通过', value: 'APPROVED' },
  { label: '已驳回', value: 'REJECTED' },
]

// 处理搜索
function handleSearch() {
  ElMessage.success('触发搜索')
}

// 处理重置
function handleReset() {
  searchForm.value = {
    shopName: '',
    status: '',
    dateRange: [],
  }
}

// 查看详情
function handleDetail(row: any) {
  currentDetail.value = row
  detailDialog.value = true
}

// 处理审核
function handleAudit(row: any, action: 'approve' | 'reject') {
  ElMessage.success(`${action === 'approve' ? '通过' : '驳回'}审核：${row.id}`)
}

// 处理分页变化
function handlePageChange(page: number) {
  pagination.value.currentPage = page
}

// 处理每页条数变化
function handleSizeChange(size: number) {
  pagination.value.pageSize = size
}
</script>

<template>
  <div class="size-page">
    <Head>
      <Title>{{ $t('admin.finance.shop_receipt.title') }}</Title>
    </Head>

    <AdminTableCard>
      <template #header>
        <el-form :model="searchForm" inline>
          <el-form-item label="商铺名称">
            <el-input
              v-model="searchForm.shopName"
              placeholder="请输入商铺名称"
              clearable
            />
          </el-form-item>
          <el-form-item label="提现状态">
            <el-select
              v-model="searchForm.status"
              placeholder="请选择状态"
              clearable
            >
              <el-option
                v-for="item in statusOptions"
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
            <el-button @click="handleReset">
              <el-icon-refresh class="mr-1" />
              重置
            </el-button>
          </el-form-item>
        </el-form>
      </template>

      <el-table
        :data="tableData"
        border
        class="w-full"
      >
        <el-table-column type="index" label="序号" width="80" />
        <el-table-column prop="shopName" label="商铺名称" />
        <el-table-column prop="amount" label="提现金额" />
        <el-table-column prop="type" label="提现方式">
          <template #default="{ row }">
            {{ row.type === 'BANK' ? '银行卡' : '支付宝' }}
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态">
          <template #default="{ row }">
            <el-tag :type="row.status === 'PENDING' ? 'warning' : row.status === 'APPROVED' ? 'success' : 'danger'">
              {{ row.status === 'PENDING' ? '待审核' : row.status === 'APPROVED' ? '已通过' : '已驳回' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createdAt" label="申请时间" />
        <el-table-column label="操作" width="200">
          <template #default="{ row }">
            <el-button
              v-if="row.status === 'PENDING'"
              size="small"
              type="success"
              @click="handleAudit(row, 'approve')"
            >
              通过
            </el-button>
            <el-button
              v-if="row.status === 'PENDING'"
              size="small"
              type="danger"
              @click="handleAudit(row, 'reject')"
            >
              驳回
            </el-button>
            <el-button
              size="small"
              type="primary"
              @click="handleDetail(row)"
            >
              详情
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="mt-4 flex justify-end">
        <el-pagination
          v-model:current-page="pagination.currentPage"
          v-model:page-size="pagination.pageSize"
          :total="pagination.total"
          :page-sizes="[10, 20, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handlePageChange"
        />
      </div>
    </AdminTableCard>

    <el-dialog
      v-model="detailDialog"
      title="提现详情"
      width="600px"
    >
      <template v-if="currentDetail">
        <div class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <span class="text-gray-500">商铺名称：</span>
              <span>{{ currentDetail.shopName }}</span>
            </div>
            <div>
              <span class="text-gray-500">提现金额：</span>
              <span>{{ currentDetail.amount }}</span>
            </div>
            <div>
              <span class="text-gray-500">提现方式：</span>
              <span>{{ currentDetail.type === 'BANK' ? '银行卡' : '支付宝' }}</span>
            </div>
            <div>
              <span class="text-gray-500">申请时间：</span>
              <span>{{ currentDetail.createdAt }}</span>
            </div>
            <div class="col-span-2">
              <span class="text-gray-500">备注：</span>
              <span>{{ currentDetail.remark }}</span>
            </div>
          </div>

          <el-divider>关联订单</el-divider>

          <el-table :data="[{ orderId: 'ORDER_001', amount: '2500.00' }, { orderId: 'ORDER_002', amount: '2500.00' }]" border>
            <el-table-column prop="orderId" label="订单编号" />
            <el-table-column prop="amount" label="订单金额" />
          </el-table>

          <div class="text-right text-lg font-bold">
            <span class="text-gray-500">订单总额：</span>
            <span class="text-primary">¥{{ currentDetail.amount }}</span>
          </div>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
