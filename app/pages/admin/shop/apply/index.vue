<!--
店铺申请
生成一个完整的店铺申请管理界面，使用 Element Plus，组件已经默认全部导入，但需要提供模拟数据，不要从其他地方导入数据。
全部使用 Tailwind CSS 进行样式布局，不要使用自定义类名，可以使用 Daisy UI 提供的工具类辅助编写样式。
不要修改原有代码，从 `INSERT_HERE` 处开始编写。不要给页面添加额外页边距，在表格中需要操作时使用小按钮。
参照 `schema.prisma` 中的模型 `ShopApply` 来设计模拟数据。
-->
<script setup lang="ts">
import { deleteApply, searchShopApplies, updateApplyStatus } from '~/api/shop-apply-api'

definePageMeta({ layout: 'admin' })

// 模拟数据
// const mockData = ref([
//   {
//     id: '1',
//     userId: 'user1',
//     realName: '张三',
//     shopName: '张三的小店',
//     reason: '希望能在平台上销售优质商品',
//     phone: '13800138000',
//     resources: ['business-license.jpg', 'id-card.jpg'],
//     status: 'PENDING',
//     shopId: null,
//     remark: '',
//     createdAt: '2024-01-15T08:00:00Z',
//     updatedAt: '2024-01-15T08:00:00Z',
//   },
//   {
//     id: '2',
//     userId: 'user2',
//     realName: '李四',
//     shopName: '品质优选',
//     reason: '拥有优质货源，想要拓展销售渠道',
//     phone: '13900139000',
//     resources: ['shop-photos.jpg'],
//     status: 'APPROVED',
//     shopId: 'shop1',
//     remark: '资质齐全，审核通过',
//     createdAt: '2024-01-14T10:30:00Z',
//     updatedAt: '2024-01-15T14:20:00Z',
//   },
// ])

const statusOptions = [
  { label: '待审核', value: 'PENDING' },
  { label: '已通过', value: 'APPROVED' },
  { label: '已拒绝', value: 'REJECTED' },
]

// 分页相关
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(100)

const shopApplyList = ref<ShopApplyVO[]>([])

// 搜索相关
const searchForm = ref({
  keyword: '',
  status: '',
  dateRange: [],
})

// 表格加载状态
const loading = ref(false)

// 计算当前行的序号
function getIndex(index: number) {
  return (currentPage.value - 1) * pageSize.value + index + 1
}

// 表格操作方法
async function handleSearch() {
  loading.value = true
  try {
    const res = await searchShopApplies({
      keyword: searchForm.value.keyword,
      status: searchForm.value.status || undefined as any,
      createdAtFrom: searchForm.value.dateRange[0],
      createdAtTo: searchForm.value.dateRange[1],
    }, {
      page: currentPage.value,
      size: pageSize.value,
    })
    shopApplyList.value = res.data.list
    total.value = res.data.total
  } finally {
    setTimeout(() => {
      loading.value = false
    }, 300)
  }
}

async function handleStatusChange(row: any, status: string) {
  // 实现编辑状态逻辑
  const data: { status: 'PENDING' | 'APPROVED' | 'REJECTED' } = {
    status: status as 'PENDING' | 'APPROVED' | 'REJECTED',
  }
  const res = await updateApplyStatus(row.id, data)
  if (res.code === 0) {
    ElMessage.success('状态更新成功')
    handleSearch()
  } else {
    ElMessage.error('状态更新失败')
  }
}

function handleReset() {
  searchForm.value = {
    keyword: '',
    status: '',
    dateRange: [],
  }
}

function handleSizeChange(val: number) {
  pageSize.value = val
  handleSearch()
}

function handleCurrentChange(val: number) {
  currentPage.value = val
  handleSearch()
}

function handleDelete(id: string) {
  ElMessageBox.confirm('确定删除该申请吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(async () => {
    // 删除逻辑
    const res = await deleteApply(id)
    if (res.code === 0) {
      ElMessage.success('删除成功')
      handleSearch()
    } else {
      ElMessage.error('删除失败')
    }
  }).catch(() => {
    ElMessage.info('已取消删除')
  })
}

function handleView(row: any) {
  ElMessageBox.alert(
    `申请详情：\n店铺名称：${row.shopName}\n申请人：${row.realName}\n联系电话：${row.phone}\n申请理由：${row.reason}`,
    '查看详情',
    { confirmButtonText: '确定' },
  )
}

onMounted(() => {
  handleSearch()
})
</script>

<template>
  <div class="size-page">
    <Head>
      <Title>{{ $t('admin.shop.title') }}</Title>
    </Head>

    <AdminTableCard>
      <template #header>
        <el-form :model="searchForm" inline>
          <el-form-item label="店铺名称">
            <el-input v-model="searchForm.keyword" placeholder="请输入店铺名称" />
          </el-form-item>
          <el-form-item label="申请状态">
            <el-select v-model="searchForm.status" placeholder="请选择状态">
              <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value" />
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
              搜索
            </el-button>
            <el-button @click="handleReset">
              重置
            </el-button>
          </el-form-item>
        </el-form>
      </template>

      <el-table v-loading="loading" :data="shopApplyList" border stripe>
        <el-table-column type="index" label="序号" width="80" align="center">
          <template #default="{ $index }">
            {{ getIndex($index) }}
          </template>
        </el-table-column>
        <el-table-column prop="shopName" label="店铺名称" />
        <el-table-column prop="realName" label="申请人" />
        <el-table-column prop="phone" label="联系电话" />
        <el-table-column prop="status" label="状态">
          <template #default="{ row }">
            <div class="flex items-center space-x-6">
              <el-tag :type="row.status === 'APPROVED' ? 'success' : row.status === 'REJECTED' ? 'danger' : 'warning'">
                {{ statusOptions.find(item => item.value === row.status)?.label }}
              </el-tag>
              <el-dropdown v-if="row.status === 'PENDING'" trigger="click">
                <el-button size="small">
                  审核
                  <el-icon>
                    <el-icon-arrow-down />
                  </el-icon>
                </el-button>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item @click="handleStatusChange(row, 'APPROVED')">
                      通过
                    </el-dropdown-item>
                    <el-dropdown-item @click="handleStatusChange(row, 'REJECTED')">
                      拒绝
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="createdAt" label="申请时间">
          <template #default="{ row }">
            {{ new Date(row.createdAt).toLocaleString() }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template #default="{ row }">
            <div class="space-x-2">
              <el-button size="small" @click="handleView(row)">
                查看
              </el-button>
              <el-button size="small" type="danger" @click="handleDelete(row.id)">
                删除
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <!-- <div class="mt-4 flex justify-end">
        <el-pagination
          :total="50"
          background
          layout="prev, pager, next"
        />
      </div> -->
      <div class="mt-4 flex justify-end">
        <el-pagination
          v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[10, 20, 50, 100]"
          :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange"
        />
      </div>
    </AdminTableCard>
  </div>
</template>
