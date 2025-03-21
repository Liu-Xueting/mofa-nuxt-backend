<!--
评论列表
- 生成一个完整的评论列表管理界面，使用 Element Plus，组件已经默认全部导入，请使用 kebab-case 命名。需要使用图标时，可使用 `el-icon` 作为图标组件前缀，如 `<el-icon-user />`。需要提供模拟数据，不要从其他地方导入数据。使用全局对象 `ElMessage` 来弹出消息。
- 全部使用 Tailwind CSS 进行样式布局，不要使用自定义类名。不要给页面添加额外页边距，在表格中需要操作时使用小按钮。顶部操作和搜索栏使用白色卡片包裹。表格需要分页，表格第一列需要是序号列，从 1 开始递增。
- 参照 `schema.prisma` 中的模型 `OrderComment` 来设计模拟数据。详情需要能够查看原订单信息，注意订单（Order）只有一个订单项（OrderItem），也就是一个订单只包含一个 SKU，因此需要显示出来，需要在详情内展示用户名等用户信息。
- 不要修改原有代码，从 `INSERT_HERE` 处开始编写。
-->
<script setup lang="ts">
definePageMeta({ layout: 'admin' })

// 模拟数据
const mockData = ref([
  {
    id: '1',
    orderItemId: 'oi001',
    userId: 'u001',
    content: '商品质量非常好，包装也很精美',
    resources: ['https://picsum.photos/200/200?random=1'],
    status: 'active',
    createdAt: '2024-01-15 14:30:00',
    user: {
      username: 'john_doe',
      nickname: '约翰',
      avatar: 'https://picsum.photos/40/40?random=1',
    },
    orderItem: {
      quantity: 1,
      sku: {
        name: '精美陶瓷茶具套装',
        price: 299.00,
      },
      order: {
        transactionId: 'tx001',
        totalAmount: '299.00',
        orderedAt: '2024-01-14 10:00:00',
        status: 'RECEIVED',
      },
    },
  },
  // ... 更多模拟数据
])

const searchForm = ref({
  keyword: '',
  status: '',
  dateRange: [],
})

const pagination = ref({
  currentPage: 1,
  pageSize: 10,
  total: 100,
})

const dialogVisible = ref(false)
const currentComment = ref<any>(null)

const statusOptions = [
  { label: '全部', value: '' },
  { label: '正常', value: 'active' },
  { label: '已隐藏', value: 'hidden' },
]

// 查看详情
function handleViewDetail(row: any) {
  currentComment.value = row
  dialogVisible.value = true
}

// 更改状态
function handleStatusChange(_row: any) {
  ElMessage.success('状态更新成功')
}

// 删除评论
function handleDelete(_row: any) {
  ElMessageBox.confirm('确定要删除这条评论吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    ElMessage.success('删除成功')
  })
}

// 处理分页变化
function handlePageChange(page: any) {
  pagination.value.currentPage = page
}

// 处理搜索
function handleSearch() {
  pagination.value.currentPage = 1
  // 实际项目中这里会调用API
}

// 重置搜索
function handleReset() {
  searchForm.value = {
    keyword: '',
    status: '',
    dateRange: [],
  }
  handleSearch()
}
</script>

<template>
  <div class="size-page">
    <Head>
      <Title>{{ $t('admin.order.comment.title') }}</Title>
    </Head>

    <AdminTableCard>
      <!-- 搜索区域 -->
      <template #header>
        <el-form :model="searchForm" inline>
          <el-form-item label="关键词">
            <el-input v-model="searchForm.keyword" placeholder="评论内容" />
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="searchForm.status" placeholder="请选择">
              <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="评论时间">
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

      <!-- 表格区域 -->
      <el-table :data="mockData" border stripe>
        <el-table-column type="index" width="60" align="center" />
        <el-table-column label="用户信息" width="200">
          <template #default="{ row }">
            <div class="flex items-center">
              <el-avatar :size="32" :src="row.user.avatar" />
              <div class="ml-2">
                <div>{{ row.user.nickname }}</div>
                <div class="text-sm text-gray-400">
                  {{ row.user.username }}
                </div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="content" label="评论内容" show-overflow-tooltip />
        <el-table-column label="评论图片" width="100">
          <template #default="{ row }">
            <el-image v-if="row.resources?.length" :src="row.resources[0]" class="size-10 rounded" fit="cover" />
            <span v-else>-</span>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="row.status === 'active' ? 'success' : 'info'">
              {{ row.status === 'active' ? '正常' : '已隐藏' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createdAt" label="评论时间" width="160" />
        <el-table-column label="操作" width="180" fixed="right">
          <template #default="{ row }">
            <el-button-group>
              <el-button size="small" @click="handleViewDetail(row)">
                <el-icon-view />详情
              </el-button>
              <el-button size="small" type="warning" @click="handleStatusChange(row)">
                {{ row.status === 'active' ? '隐藏' : '显示' }}
              </el-button>
              <el-button size="small" type="danger" @click="handleDelete(row)">
                <el-icon-delete />删除
              </el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="mt-4 flex justify-end">
        <el-pagination
          :current-page="pagination.currentPage" :page-size="pagination.pageSize" :total="pagination.total"
          background layout="prev, pager, next" @current-change="handlePageChange"
        />
      </div>
    </AdminTableCard>

    <!-- 详情对话框 -->
    <el-dialog v-model="dialogVisible" title="评论详情" width="600px">
      <template v-if="currentComment">
        <div class="space-y-4">
          <!-- 用户信息 -->
          <div class="rounded bg-gray-50 p-4">
            <h3 class="mb-2 text-lg font-medium">
              用户信息
            </h3>
            <div class="flex items-center">
              <el-avatar :size="40" :src="currentComment.user.avatar" />
              <div class="ml-3">
                <div class="font-medium">
                  {{ currentComment.user.nickname }}
                </div>
                <div class="text-gray-500">
                  {{ currentComment.user.username }}
                </div>
              </div>
            </div>
          </div>

          <!-- 订单信息 -->
          <div class="rounded bg-gray-50 p-4">
            <h3 class="mb-2 text-lg font-medium">
              订单信息
            </h3>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <div class="text-gray-500">
                  商品名称
                </div>
                <div>{{ currentComment.orderItem.sku.name }}</div>
              </div>
              <div>
                <div class="text-gray-500">
                  购买数量
                </div>
                <div>{{ currentComment.orderItem.quantity }}</div>
              </div>
              <div>
                <div class="text-gray-500">
                  商品单价
                </div>
                <div>￥{{ currentComment.orderItem.sku.price }}</div>
              </div>
              <div>
                <div class="text-gray-500">
                  订单状态
                </div>
                <div>
                  <el-tag size="small">
                    {{ currentComment.orderItem.order.status }}
                  </el-tag>
                </div>
              </div>
            </div>
          </div>

          <!-- 评论内容 -->
          <div class="rounded bg-gray-50 p-4">
            <h3 class="mb-2 text-lg font-medium">
              评论内容
            </h3>
            <div class="text-gray-700">
              {{ currentComment.content }}
            </div>
            <div v-if="currentComment.resources?.length" class="mt-2 flex gap-2">
              <el-image
                v-for="(url, index) in currentComment.resources" :key="index" :src="url" class="size-20 rounded"
                fit="cover"
              />
            </div>
          </div>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
