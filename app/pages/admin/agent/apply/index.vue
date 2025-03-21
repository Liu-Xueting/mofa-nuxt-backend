<!--
代理申请
- 生成一个完整的代理申请管理界面，使用 Element Plus，组件已经默认全部导入，请使用 kebab-case 命名。需要使用图标时，可使用 `el-icon` 作为图标组件前缀，如 `<el-icon-user />`。需要提供模拟数据，不要从其他地方导入数据。使用全局对象 `ElMessage` 来弹出消息。
- 全部使用 Tailwind CSS 进行样式布局，不要使用自定义类名。不要给页面添加额外页边距，在表格中需要操作时使用小按钮。顶部操作和搜索栏使用白色卡片包裹。表格需要分页，表格第一列需要是序号列，从 1 开始递增。
- 参照 `schema.prisma` 中的模型 `AgentApply` 来设计模拟数据。
- 不要修改原有代码，从 `INSERT_HERE` 处开始编写。
-->
<script setup lang="ts">
definePageMeta({ layout: 'admin' })

// 模拟数据
const tableData = ref([
  {
    id: '1',
    userId: 'user1',
    realName: '张三',
    agentName: '张三代理公司',
    reason: '想要成为代理商拓展业务',
    phone: '13800138000',
    resources: ['business-license.jpg', 'id-card.jpg'],
    status: 'PENDING',
    agentId: null,
    remark: '',
    createdAt: '2024-01-15 10:00:00',
  },
  {
    id: '2',
    userId: 'user2',
    realName: '李四',
    agentName: '李四贸易有限公司',
    reason: '有丰富的销售渠道和资源',
    phone: '13900139000',
    resources: ['company-info.pdf'],
    status: 'APPROVED',
    agentId: 'agent1',
    remark: '资质良好',
    createdAt: '2024-01-14 15:30:00',
  },
  {
    id: '3',
    userId: 'user3',
    realName: '王五',
    agentName: '王五商贸',
    reason: '希望开拓新的业务领域',
    phone: '13700137000',
    resources: ['qualification.pdf', 'other-docs.zip'],
    status: 'REJECTED',
    agentId: null,
    remark: '资质不符',
    createdAt: '2024-01-13 09:15:00',
  },
])

// 分页配置
const pagination = ref({
  currentPage: 1,
  pageSize: 10,
  total: 100,
})

// 搜索表单
const searchForm = ref({
  keyword: '',
  status: '',
  dateRange: [],
})

// 状态选项
const statusOptions = [
  { label: '待审核', value: 'PENDING' },
  { label: '已通过', value: 'APPROVED' },
  { label: '已拒绝', value: 'REJECTED' },
]

// 处理搜索
function handleSearch() {
  ElMessage.success('触发搜索')
  // 实际项目中这里需要调用API
}

// 重置搜索
function handleReset() {
  searchForm.value = {
    keyword: '',
    status: '',
    dateRange: [],
  }
}

// 处理分页变化
function handleCurrentChange(val: number) {
  pagination.value.currentPage = val
}

// 处理审核
function handleAudit(row: any, action: 'approve' | 'reject') {
  ElMessage.success(`${action === 'approve' ? '通过' : '拒绝'}申请：${row.agentName}`)
}

// 查看详情
function handleDetail(row: any) {
  ElMessage.info(`查看申请详情：${row.agentName}`)
}
</script>

<template>
  <div class="size-page">
    <Head>
      <Title>{{ $t('admin.agent.apply.title') }}</Title>
    </Head>

    <AdminTableCard>
      <!-- 搜索区域 -->
      <template #header>
        <el-form :model="searchForm" inline>
          <el-form-item label="关键词">
            <el-input
              v-model="searchForm.keyword"
              placeholder="申请人/代理名称"
              clearable
            />
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
          <el-form-item label="申请日期">
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

      <!-- 表格区域 -->
      <el-table :data="tableData" border stripe class="w-full">
        <el-table-column type="index" width="60" align="center" />
        <el-table-column prop="realName" label="申请人" min-width="100" />
        <el-table-column prop="agentName" label="代理名称" min-width="150" />
        <el-table-column prop="phone" label="联系电话" min-width="120" />
        <el-table-column prop="reason" label="申请理由" min-width="200" show-overflow-tooltip />
        <el-table-column prop="status" label="状态" width="100">
          <template #default="{ row }">
            <el-tag
              :type="row.status === 'PENDING' ? 'warning' : row.status === 'APPROVED' ? 'success' : 'danger'"
            >
              {{ statusOptions.find(item => item.value === row.status)?.label }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createdAt" label="申请时间" width="160" />
        <el-table-column label="操作" width="200" fixed="right">
          <template #default="{ row }">
            <el-button
              v-if="row.status === 'PENDING'"
              type="success"
              size="small"
              @click="handleAudit(row, 'approve')"
            >
              通过
            </el-button>
            <el-button
              v-if="row.status === 'PENDING'"
              type="danger"
              size="small"
              @click="handleAudit(row, 'reject')"
            >
              拒绝
            </el-button>
            <el-button type="primary" size="small" @click="handleDetail(row)">
              详情
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="mt-4 flex justify-end">
        <el-pagination
          v-model:current-page="pagination.currentPage"
          :page-size="pagination.pageSize"
          :total="pagination.total"
          background
          layout="prev, pager, next, jumper"
          @current-change="handleCurrentChange"
        />
      </div>
    </AdminTableCard>
  </div>
</template>
