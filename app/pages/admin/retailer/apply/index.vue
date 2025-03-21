<!--
门店申请
生成一个完整的门店申请界面，使用 Element Plus，组件已经默认全部导入，请使用 kebab-case 命名。需要使用图标时，可使用 `el-icon` 作为图标组件前缀，如 `<el-icon-user />`。需要提供模拟数据，不要从其他地方导入数据。使用全局对象 `ElMessage` 来弹出消息。
全部使用 Tailwind CSS 进行样式布局，不要使用自定义类名，可以使用 Daisy UI 提供的工具类辅助编写样式。不要给页面添加额外页边距，在表格中需要操作时使用小按钮。顶部操作和搜索栏使用白色卡片包裹。
参照 `schema.prisma` 中的模型 `RetailerApply` 来设计模拟数据。门店是用户，是一种角色而非店铺。
不要修改原有代码，从 `INSERT_HERE` 处开始编写。
-->
<script setup lang="ts">
import { searchRetailerApplies, updateRetailerApplyStatus } from '~/api/retailer-apply-api'

definePageMeta({ layout: 'admin' })

interface RetailerApply {
  id: string
  userId: string
  realName: string
  retailerName: string
  reason: string
  phone: string
  resources: string[]
  status: string
  remark?: string
  createdAt: string
}

const searchForm = ref({
  keyword: '',
  status: '',
  dateRange: [] as string[],
})

const statusOptions = [
  { label: '待审核', value: 'PENDING' },
  { label: '已通过', value: 'APPROVED' },
  { label: '已拒绝', value: 'REJECTED' },
]

// 模拟数据
// const tableData = ref<RetailerApply[]>([
//   {
//     id: '1',
//     userId: 'user1',
//     realName: '张三',
//     retailerName: '张三的便利店',
//     reason: '希望成为门店合作伙伴',
//     phone: '13800138000',
//     resources: ['business-license.jpg', 'id-card.jpg'],
//     status: 'PENDING',
//     createdAt: '2024-01-15 10:00:00',
//   },
//   {
//     id: '2',
//     userId: 'user2',
//     realName: '李四',
//     retailerName: '李四零食店',
//     reason: '扩大经营规模',
//     phone: '13900139000',
//     resources: ['license.jpg'],
//     status: 'APPROVED',
//     remark: '资料完整，通过审核',
//     createdAt: '2024-01-14 15:30:00',
//   },
// ])

const retailerApplyList = ref<RetailerApplyVO[]>([])

// 表格加载状态
const loading = ref(false)

// 分页数据
const pagination = ref({
  currentPage: 1,
  pageSize: 10,
  total: 20, // 实际项目中从后端获取
})

async function handleSearch() {
  loading.value = true
  try {
    const res = await searchRetailerApplies({
      keyword: searchForm.value.keyword,
      status: searchForm.value.status || undefined as any,
      createdAtFrom: searchForm.value.dateRange[0],
      createdAtTo: searchForm.value.dateRange[1],
    }, {
      page: pagination.value.currentPage,
      size: pagination.value.pageSize,
    })
    retailerApplyList.value = res.data.list
    pagination.value.total = res.data.total
  } finally {
    setTimeout(() => {
      loading.value = false
    }, 300)
  }
}

function handleReset() {
  searchForm.value = {
    keyword: '',
    status: '',
    dateRange: [],
  }
}

const dialogVisible = ref(false)
const currentApply = ref<RetailerApply | null>(null)

function handleView(row: RetailerApply) {
  currentApply.value = row
  dialogVisible.value = true
}

async function handleApprove(id: string, status: string) {
  const data: { status: 'PENDING' | 'APPROVED' | 'REJECTED' } = {
    status: status as 'PENDING' | 'APPROVED' | 'REJECTED',
  }
  const res = await updateRetailerApplyStatus(id, data)
  if (res.code === 0) {
    ElMessage.success('状态修改成功')
    handleSearch()
  } else {
    ElMessage.error('状态修改失败')
  }
}

// 计算当前行的序号
function getIndex(index: number) {
  return (pagination.value.currentPage - 1) * pagination.value.pageSize + index + 1
}

// 处理分页变化
function handleCurrentChange(page: number) {
  pagination.value.currentPage = page
  // 实际项目中这里需要调用API获取数据
  ElMessage.success(`加载第 ${page} 页数据`)
}

function handleSizeChange(size: number) {
  pagination.value.pageSize = size
  pagination.value.currentPage = 1
  // 实际项目中这里需要调用API获取数据
  ElMessage.success(`每页显示 ${size} 条`)
}

onMounted(() => {
  handleSearch()
})
</script>

<template>
  <div class="size-page">
    <Head>
      <Title>{{ $t('admin.retailer.apply.title') }}</Title>
    </Head>

    <AdminTableCard>
      <!-- 搜索区域 -->
      <template #header>
        <el-form :model="searchForm" inline>
          <el-form-item label="搜索">
            <el-input
              v-model="searchForm.keyword"
              placeholder="门店名称/申请人"
              clearable
            >
              <template #prefix>
                <el-icon-search />
              </template>
            </el-input>
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

      <!-- 列表区域 -->
      <el-table v-loading="loading" :data="retailerApplyList" border stripe>
        <el-table-column type="index" label="序号" width="80" align="center">
          <template #default="{ $index }">
            {{ getIndex($index) }}
          </template>
        </el-table-column>
        <el-table-column prop="retailerName" label="门店名称" min-width="160" />
        <el-table-column prop="realName" label="申请人" width="120" />
        <el-table-column prop="phone" label="联系电话" width="140" />
        <el-table-column prop="reason" label="申请理由" min-width="200" show-overflow-tooltip />
        <el-table-column prop="status" label="状态" width="100">
          <template #default="{ row }">
            <el-tag
              :type="row.status === 'PENDING' ? 'warning' : row.status === 'APPROVED' ? 'success' : 'danger'"
            >
              {{ statusOptions.find(opt => opt.value === row.status)?.label }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createdAt" label="申请时间" width="160" />
        <el-table-column label="操作" width="180" fixed="right">
          <template #default="{ row }">
            <el-button size="small" type="info" @click="handleView(row)">
              查看
            </el-button>
            <template v-if="row.status === 'PENDING'">
              <el-button size="small" type="success" @click="handleApprove(row.id, 'APPROVED')">
                通过
              </el-button>
              <el-button size="small" type="danger" @click="handleApprove(row.id, 'REJECTED')">
                拒绝
              </el-button>
            </template>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页器 -->
      <div class="mt-4 flex justify-end">
        <el-pagination
          v-model:current-page="pagination.currentPage"
          v-model:page-size="pagination.pageSize"
          :page-sizes="[10, 20, 50, 100]"
          :total="pagination.total"
          layout="total, sizes, prev, pager, next"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </AdminTableCard>

    <!-- 查看详情弹窗 -->
    <el-dialog
      v-model="dialogVisible"
      title="申请详情"
      width="600px"
    >
      <template v-if="currentApply">
        <el-descriptions :column="1" border>
          <el-descriptions-item label="门店名称">
            {{ currentApply.retailerName }}
          </el-descriptions-item>
          <el-descriptions-item label="申请人">
            {{ currentApply.realName }}
          </el-descriptions-item>
          <el-descriptions-item label="联系电话">
            {{ currentApply.phone }}
          </el-descriptions-item>
          <el-descriptions-item label="申请理由">
            {{ currentApply.reason }}
          </el-descriptions-item>
          <el-descriptions-item label="上传资料">
            <el-space>
              <el-link
                v-for="(resource, index) in currentApply.resources"
                :key="index"
                type="primary"
                :underline="false"
              >
                <el-icon-document class="mr-1" />
                {{ resource }}
              </el-link>
            </el-space>
          </el-descriptions-item>
          <el-descriptions-item label="申请状态">
            <el-tag
              :type="currentApply.status === 'PENDING' ? 'warning' : currentApply.status === 'APPROVED' ? 'success' : 'danger'"
            >
              {{ statusOptions.find(opt => opt.value === currentApply!.status)?.label }}
            </el-tag>
          </el-descriptions-item>
          <el-descriptions-item v-if="currentApply.remark" label="备注">
            {{ currentApply.remark }}
          </el-descriptions-item>
        </el-descriptions>
      </template>
      <template #footer>
        <el-button @click="dialogVisible = false">
          关闭
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>
