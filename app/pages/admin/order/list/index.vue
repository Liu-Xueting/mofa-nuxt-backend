<!--
订单列表
- 生成一个完整的地址列表管理界面，使用 Element Plus，组件已经默认全部导入，请使用 kebab-case 命名。需要使用图标时，可使用 `el-icon` 作为图标组件前缀，如 `<el-icon-user />`。需要提供模拟数据，不要从其他地方导入数据。使用全局对象 `ElMessage` 来弹出消息。
- 全部使用 Tailwind CSS 进行样式布局，不要使用自定义类名。不要给页面添加额外页边距，在表格中需要操作时使用小按钮。顶部操作和搜索栏使用白色卡片包裹。
- 参照 `schema.prisma` 中的模型 `Order` 来设计模拟数据。
- 不要修改原有代码，从 `INSERT_HERE` 处开始编写。
-->
<script setup lang="ts">
import type { AddressVO, OrderVO } from '~~/types/vo'

definePageMeta({ layout: 'admin' })

// 模拟订单数据
const orders = ref([
  {
    id: 'ord001',
    transactionId: 'tx001',
    userId: 'usr001',
    user: {
      username: 'zhang_san',
      nickname: '张三',
      phone: '13800138000',
    },
    addressId: 'addr001',
    address: {
      recipient: '张三',
      phone: '13800138000',
      province: '广东省',
      city: '深圳市',
      district: '南山区',
      address: '科技园路1号',
    },
    description: '普通订单',
    totalAmount: '299.00',
    status: 'PAID',
    orderedAt: '2024-01-15T10:00:00Z',
    paidAt: '2024-01-15T10:05:00Z',
    remark: '',
    orderItem: {
      id: 'item001',
      quantity: 1,
      sku: {
        id: 'sku001',
        name: 'iPhone 15 黑色 128G',
        price: '299.00',
      },
    },
    shop: {
      id: 'shop001',
      name: '官方旗舰店',
    },
    delivery: {
      id: 'del001',
      company: '顺丰速运',
      number: 'SF1234567890',
      items: [
        { status: '已签收', deliveryTime: '2024-01-16T14:00:00Z' },
        { status: '运输中', deliveryTime: '2024-01-16T10:00:00Z' },
        { status: '已发货', deliveryTime: '2024-01-16T08:00:00Z' },
      ],
    },
  },
])

// 搜索条件
const searchForm = ref({
  orderNumber: '',
  status: '',
  dateRange: [],
})

// 状态选项
const statusOptions = [
  { label: '待付款', value: 'PENDING' },
  { label: '已付款', value: 'PAID' },
  { label: '已发货', value: 'DELIVERED' },
  { label: '已收货', value: 'RECEIVED' },
  { label: '已取消', value: 'CANCELED' },
  { label: '已退款', value: 'REFUNDED' },
]

// 表格加载状态
const loading = ref(false)

// 详情对话框
const dialogVisible = ref(false)
const currentOrder = ref<OrderVO & {
  address: AddressVO
  orderItem: any
  delivery: any
  shop: any
}>({} as any)

// 查看详情
function handleView(row: any) {
  currentOrder.value = row
  dialogVisible.value = true
}

// 搜索
function handleSearch() {
  loading.value = true
  setTimeout(() => {
    loading.value = false
    ElMessage.success('搜索完成')
  }, 1000)
}

// 重置搜索
function handleReset() {
  searchForm.value = {
    orderNumber: '',
    status: '',
    dateRange: [],
  }
}

// 导出数据
function handleExport() {
  ElMessage.success('正在导出数据...')
}

// 格式化状态
function formatStatus(status: string) {
  const statusMap = {
    PENDING: '待付款',
    PAID: '已付款',
    DELIVERED: '已发货',
    RECEIVED: '已收货',
    CANCELED: '已取消',
    REFUNDED: '已退款',
  } as const
  return statusMap[status as keyof typeof statusMap] || status
}

// 分页参数
const pagination = ref({
  currentPage: 1,
  pageSize: 10,
  total: 100,
})

// 切换页码
function handleCurrentChange(page: number) {
  pagination.value.currentPage = page
  handleSearch()
}

// 切换每页数量
function handleSizeChange(size: number) {
  pagination.value.pageSize = size
  pagination.value.currentPage = 1
  handleSearch()
}
</script>

<template>
  <div class="size-page">
    <Head>
      <Title>{{ $t('admin.order.list.title') }}</Title>
    </Head>

    <AdminTableCard>
      <template #header>
        <!-- 搜索区域 -->
        <el-form :model="searchForm" inline>
          <el-form-item label="订单编号">
            <el-input v-model="searchForm.orderNumber" placeholder="请输入订单编号" clearable />
          </el-form-item>
          <el-form-item label="订单状态">
            <el-select v-model="searchForm.status" placeholder="请选择状态" clearable>
              <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="下单时间">
            <el-date-picker v-model="searchForm.dateRange" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" />
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
            <el-button type="success" @click="handleExport">
              <el-icon-download class="mr-1" />
              导出
            </el-button>
          </el-form-item>
        </el-form>
      </template>

      <!-- 表格区域 -->
      <el-table v-loading="loading" :data="orders" border>
        <el-table-column type="index" label="序号" width="80" align="center">
          <template #default="{ $index }">
            {{ (pagination.currentPage - 1) * pagination.pageSize + $index + 1 }}
          </template>
        </el-table-column>
        <el-table-column label="订单编号" prop="id" min-width="120" />
        <el-table-column label="用户信息" min-width="150">
          <template #default="{ row }">
            <div>{{ row.user.nickname }}({{ row.user.username }})</div>
            <div class="text-sm text-gray-500">
              {{ row.user.phone }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="商品信息" min-width="200">
          <template #default="{ row }">
            <div>{{ row.orderItem.sku.name }}</div>
            <div class="text-sm text-gray-500">
              数量：{{ row.orderItem.quantity }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="订单金额" prop="totalAmount" width="120">
          <template #default="{ row }">
            ¥{{ row.totalAmount }}
          </template>
        </el-table-column>
        <el-table-column label="订单状态" width="100">
          <template #default="{ row }">
            <el-tag :type="row.status === 'PAID' ? 'success' : 'info'">
              {{ formatStatus(row.status) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="下单时间" prop="orderedAt" width="180">
          <template #default="{ row }">
            {{ new Date(row.orderedAt).toLocaleString() }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" size="small" @click="handleView(row)">
              查看
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="mt-4 flex justify-end">
        <el-pagination
          v-model:current-page="pagination.currentPage"
          v-model:page-size="pagination.pageSize"
          :page-sizes="[10, 20, 50, 100]"
          background
          layout="total, sizes, prev, pager, next"
          :total="pagination.total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </AdminTableCard>

    <!-- 详情对话框 -->
    <el-dialog v-model="dialogVisible" title="订单详情" width="800px">
      <template v-if="currentOrder">
        <el-descriptions :column="2" border>
          <el-descriptions-item label="订单编号">
            {{ currentOrder.id }}
          </el-descriptions-item>
          <el-descriptions-item label="订单状态">
            {{ formatStatus(currentOrder.status) }}
          </el-descriptions-item>
          <el-descriptions-item label="下单时间">
            {{ new Date(currentOrder.orderedAt).toLocaleString() }}
          </el-descriptions-item>
          <el-descriptions-item label="支付时间">
            {{ currentOrder.paidAt ? new Date(currentOrder.paidAt).toLocaleString() : '-' }}
          </el-descriptions-item>
        </el-descriptions>

        <el-divider content-position="left">
          收货信息
        </el-divider>
        <el-descriptions :column="2" border>
          <el-descriptions-item label="收货人">
            {{ currentOrder.address.recipient }}
          </el-descriptions-item>
          <el-descriptions-item label="联系电话">
            {{ currentOrder.address.phone }}
          </el-descriptions-item>
          <el-descriptions-item label="收货地址" :span="2">
            {{ currentOrder.address.province }}{{ currentOrder.address.city }}{{ currentOrder.address.district }}{{ currentOrder.address.address }}
          </el-descriptions-item>
        </el-descriptions>

        <el-divider content-position="left">
          商品信息
        </el-divider>
        <el-descriptions :column="2" border>
          <el-descriptions-item label="店铺名称">
            {{ currentOrder.shop.name }}
          </el-descriptions-item>
          <el-descriptions-item label="商品名称">
            {{ currentOrder.orderItem.sku.name }}
          </el-descriptions-item>
          <el-descriptions-item label="商品单价">
            ¥{{ currentOrder.orderItem.sku.price }}
          </el-descriptions-item>
          <el-descriptions-item label="购买数量">
            {{ currentOrder.orderItem.quantity }}
          </el-descriptions-item>
        </el-descriptions>

        <template v-if="currentOrder.delivery">
          <el-divider content-position="left">
            物流信息
          </el-divider>
          <el-descriptions :column="2" border>
            <el-descriptions-item label="物流公司">
              {{ currentOrder.delivery.company }}
            </el-descriptions-item>
            <el-descriptions-item label="物流单号">
              {{ currentOrder.delivery.number }}
            </el-descriptions-item>
          </el-descriptions>
          <el-timeline class="mt-4">
            <el-timeline-item v-for="item in currentOrder.delivery.items" :key="item.deliveryTime" :timestamp="new Date(item.deliveryTime).toLocaleString()">
              {{ item.status }}
            </el-timeline-item>
          </el-timeline>
        </template>
      </template>
    </el-dialog>
  </div>
</template>
