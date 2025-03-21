<!--
物流列表
- 生成一个完整的物流列表管理界面，使用 Element Plus，组件已经默认全部导入，请使用 kebab-case 命名。需要使用图标时，可使用 `el-icon` 作为图标组件前缀，如 `<el-icon-user />`。需要提供模拟数据，不要从其他地方导入数据。使用全局对象 `ElMessage` 来弹出消息。
- 全部使用 Tailwind CSS 进行样式布局，不要使用自定义类名。不要给页面添加额外页边距，在表格中需要操作时使用小按钮。顶部操作和搜索栏使用白色卡片包裹。表格需要分页，表格第一列需要是序号列，从 1 开始递增。
- 参照 `schema.prisma` 中的模型 `Delivery` 来设计模拟数据。详情需要能够查看原订单信息，注意订单（Order）只有一个订单项（OrderItem），也就是一个订单只包含一个 SKU，因此需要显示出来，需要在详情内展示物流项（DeliveryItem）的详细信息。
- 不要修改原有代码，从 `INSERT_HERE` 处开始编写。
-->
<script setup lang="ts">
definePageMeta({ layout: 'admin' })

// 模拟数据
const deliveryData = ref([
  {
    id: '1',
    orderId: 'ORD001',
    company: '顺丰快递',
    number: 'SF1234567890',
    createdAt: '2024-01-15 10:30:00',
    createdBy: 'admin',
    updatedAt: '2024-01-15 10:30:00',
    order: {
      id: 'ORD001',
      totalAmount: '299.00',
      status: 'DELIVERED',
      orderedAt: '2024-01-15 09:30:00',
      items: [{
        id: 'ITEM001',
        quantity: 1,
        sku: {
          id: 'SKU001',
          name: '商品名称 A',
          price: 299.00,
        },
      }],
    },
    deliveryItems: [
      { id: 'DI001', status: '已揽收', deliveryTime: '2024-01-15 11:00:00' },
      { id: 'DI002', status: '运输中', deliveryTime: '2024-01-15 14:30:00' },
      { id: 'DI003', status: '派送中', deliveryTime: '2024-01-16 09:00:00' },
    ],
  },
  // 更多模拟数据...
])

// 分页设置
const pagination = ref({
  currentPage: 1,
  pageSize: 10,
  total: 100,
})

// 搜索条件
const searchForm = ref({
  orderNumber: '',
  deliveryNumber: '',
  company: '',
})

// 详情对话框
const dialogVisible = ref(false)
const currentDelivery = ref<any>(null)

// 查看详情
function handleView(row: any) {
  currentDelivery.value = row
  dialogVisible.value = true
}

// 刷新数据
function handleRefresh() {
  ElMessage.success('数据已刷新')
}

// 处理分页变化
function handlePageChange(page: any) {
  pagination.value.currentPage = page
}

// 处理搜索
function handleSearch() {
  ElMessage.success('搜索条件已更新')
  pagination.value.currentPage = 1
}

// 重置搜索
function handleReset() {
  searchForm.value = {
    orderNumber: '',
    deliveryNumber: '',
    company: '',
  }
}
</script>

<template>
  <div class="size-page">
    <Head>
      <Title>{{ $t('admin.order.delivery.title') }}</Title>
    </Head>

    <AdminTableCard>
      <template #header>
        <!-- 搜索区域 -->
        <el-form :model="searchForm" inline>
          <el-form-item label="订单编号">
            <el-input v-model="searchForm.orderNumber" placeholder="请输入订单编号" />
          </el-form-item>
          <el-form-item label="物流单号">
            <el-input v-model="searchForm.deliveryNumber" placeholder="请输入物流单号" />
          </el-form-item>
          <el-form-item label="物流公司">
            <el-input v-model="searchForm.company" placeholder="请输入物流公司" />
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

      <!-- 表格区域 -->
      <div class="mb-4 flex justify-between">
        <div class="text-lg font-medium">
          物流列表
        </div>
        <el-button type="primary" @click="handleRefresh">
          <el-icon-refresh class="mr-1" />刷新
        </el-button>
      </div>

      <el-table :data="deliveryData" stripe>
        <el-table-column type="index" width="60" />
        <el-table-column prop="order.id" label="订单编号" width="120" />
        <el-table-column prop="company" label="物流公司" width="120" />
        <el-table-column prop="number" label="物流单号" width="150" />
        <el-table-column prop="createdAt" label="创建时间" width="180" />
        <el-table-column prop="order.status" label="订单状态" width="100">
          <template #default="{ row }">
            <el-tag :type="row.order.status === 'DELIVERED' ? 'success' : 'info'">
              {{ row.order.status }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="100">
          <template #default="{ row }">
            <el-button type="primary" link size="small" @click="handleView(row)">
              查看详情
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="mt-4 flex justify-end">
        <el-pagination
          v-model:current-page="pagination.currentPage"
          :page-size="pagination.pageSize"
          :total="pagination.total"
          background
          layout="prev, pager, next"
          @current-change="handlePageChange"
        />
      </div>
    </AdminTableCard>

    <!-- 详情对话框 -->
    <el-dialog
      v-model="dialogVisible"
      title="物流详情"
      width="600px"
    >
      <template v-if="currentDelivery">
        <div class="space-y-4">
          <div class="rounded-lg bg-gray-50 p-4">
            <h3 class="mb-2 font-medium">
              订单信息
            </h3>
            <div class="grid grid-cols-2 gap-4">
              <div>订单编号：{{ currentDelivery.order.id }}</div>
              <div>订单金额：￥{{ currentDelivery.order.totalAmount }}</div>
              <div>下单时间：{{ currentDelivery.order.orderedAt }}</div>
              <div>订单状态：{{ currentDelivery.order.status }}</div>
            </div>
          </div>

          <div class="rounded-lg bg-gray-50 p-4">
            <h3 class="mb-2 font-medium">
              商品信息
            </h3>
            <div class="grid grid-cols-2 gap-4">
              <div>商品名称：{{ currentDelivery.order.items[0].sku.name }}</div>
              <div>商品数量：{{ currentDelivery.order.items[0].quantity }}</div>
              <div>商品单价：￥{{ currentDelivery.order.items[0].sku.price }}</div>
            </div>
          </div>

          <div class="rounded-lg bg-gray-50 p-4">
            <h3 class="mb-2 font-medium">
              物流信息
            </h3>
            <el-timeline>
              <el-timeline-item
                v-for="item in currentDelivery.deliveryItems"
                :key="item.id"
                :timestamp="item.deliveryTime"
              >
                {{ item.status }}
              </el-timeline-item>
            </el-timeline>
          </div>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
