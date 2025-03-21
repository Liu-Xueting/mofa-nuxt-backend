<!--
地址列表
- 生成一个完整的地址列表管理界面，使用 Element Plus，组件已经默认全部导入，请使用 kebab-case 命名。需要使用图标时，可使用 `el-icon` 作为图标组件前缀，如 `<el-icon-user />`。需要提供模拟数据，不要从其他地方导入数据。使用全局对象 `ElMessage` 来弹出消息。
- 全部使用 Tailwind CSS 进行样式布局，不要使用自定义类名。不要给页面添加额外页边距，在表格中需要操作时使用小按钮。顶部操作和搜索栏使用白色卡片包裹。
- 参照 `schema.prisma` 中的模型 `Address` 来设计模拟数据。需要显示用户名等用户信息。
- 不要修改原有代码，从 `INSERT_HERE` 处开始编写。
-->
<script setup lang="ts">
definePageMeta({ layout: 'admin' })

// 模拟数据
const mockAddresses = ref([
  {
    id: '1',
    userId: '101',
    user: { username: 'john_doe', nickname: '约翰' },
    recipient: '张三',
    phone: '13800138000',
    province: '广东省',
    city: '深圳市',
    district: '南山区',
    street: '科技园路',
    address: '科兴科学园 B 栋 10 层',
    isDefault: true,
    createdAt: '2024-01-15T08:00:00Z',
    updatedAt: '2024-01-15T08:00:00Z',
  },
  {
    id: '2',
    userId: '102',
    user: { username: 'jane_smith', nickname: '简妮' },
    recipient: '李四',
    phone: '13900139000',
    province: '北京市',
    city: '北京市',
    district: '朝阳区',
    street: '建国路',
    address: '国贸大厦 15 层',
    isDefault: false,
    createdAt: '2024-01-14T10:30:00Z',
    updatedAt: '2024-01-14T10:30:00Z',
  },
])

// 搜索条件
const searchForm = ref({
  keyword: '',
  province: '',
  isDefault: '',
})

// 表格加载状态
const tableLoading = ref(false)

// 分页数据
const pagination = ref({
  currentPage: 1,
  pageSize: 10,
  total: 100, // 更改为更合理的总数
})

// 计算当前页数据
const currentPageData = computed(() => {
  const start = (pagination.value.currentPage - 1) * pagination.value.pageSize
  const end = start + pagination.value.pageSize
  return mockAddresses.value.slice(start, end)
})

// 对话框
const dialogVisible = ref(false)
const dialogTitle = ref('添加标签')
const dialogForm = ref({
  id: '',
  name: '',
  description: '',
})
const dialogType = ref('add')

// 处理分页变化
function handlePageChange() {
  tableLoading.value = true
  setTimeout(() => {
    tableLoading.value = false
  }, 500)
}

// 搜索方法
function handleSearch() {
  tableLoading.value = true
  setTimeout(() => {
    tableLoading.value = false
    ElMessage.success('搜索完成')
  }, 500)
}

// 重置搜索
function handleReset() {
  searchForm.value = {
    keyword: '',
    province: '',
    isDefault: '',
  }
}

// 添加/编辑对话框
function handleDialog(type: string, row?: any) {
  dialogType.value = type
  dialogTitle.value = type === 'add' ? '添加标签' : '编辑标签'
  dialogVisible.value = true
  if (type === 'edit' && row) {
    dialogForm.value = { ...row }
  } else {
    dialogForm.value = {
      id: '',
      name: '',
      description: '',
    }
  }
}

// 删除地址
function handleDelete(row: any) {
  ElMessageBox.confirm('确认删除该地址记录吗？', '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    mockAddresses.value = mockAddresses.value.filter(item => item.id !== row.id)
    ElMessage.success('删除成功')
  }).catch(() => {
    ElMessage.info('已取消删除')
  })
}

// 提交表单
function handleSubmit() {
  // if (dialogType.value === 'add') {
  //   const newTag = {
  //     ...dialogForm.value,

  //   }
  //   mockAddresses.value.push(newTag)
  // } else {
  //   // const index = mockData.value.findIndex(item => item.id === dialogForm.value.id)
  //   // mockData.value[index] = {
  //   //   ...dialogForm.value,
  //   //   updatedAt: new Date().toISOString(),
  //   //   updatedBy: 'admin',
  //   // }
  // }
  // ElMessage.success(dialogType.value === 'add' ? '添加成功' : '编辑成功')
  // dialogVisible.value = false
  // tableData.value = mockAddresses.value
  // total.value = mockAddresses.value.length
}

// 设为默认地址
function handleSetDefault(row: any) {
  mockAddresses.value.forEach((item) => {
    item.isDefault = item.id === row.id
  })
  ElMessage.success('设置成功')
}
</script>

<template>
  <div class="size-page">
    <Head>
      <Title>{{ $t('admin.order.address.title') }}</Title>
    </Head>

    <AdminTableCard>
      <template #header>
        <el-form :model="searchForm" inline>
          <el-form-item label="搜索关键词">
            <el-input
              v-model="searchForm.keyword"
              placeholder="收件人/电话/地址"
              clearable
            />
          </el-form-item>
          <el-form-item label="省份">
            <el-input
              v-model="searchForm.province"
              placeholder="请输入省份"
              clearable
            />
          </el-form-item>
          <el-form-item label="默认地址">
            <el-select v-model="searchForm.isDefault" placeholder="全部" clearable>
              <el-option label="是" value="true" />
              <el-option label="否" value="false" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSearch">
              <el-icon-search />
              搜索
            </el-button>
            <el-button @click="handleReset">
              <el-icon-refresh />
              重置
            </el-button>
          </el-form-item>
        </el-form>
      </template>

      <template #toolbar>
        <el-button type="primary" @click="handleDialog('add')">
          <el-icon-plus class="mr-1" />添加地址
        </el-button>
      </template>

      <el-table
        v-loading="tableLoading"
        :data="currentPageData"
        style="width: 100%"
      >
        <el-table-column type="index" label="序号" width="80" align="center">
          <template #default="scope">
            <span>{{ (pagination.currentPage - 1) * pagination.pageSize + scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column label="用户信息" width="150">
          <template #default="{ row }">
            <div>{{ row.user.nickname }}</div>
            <div class="text-sm text-gray-400">
              {{ row.user.username }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="收件人信息" width="150">
          <template #default="{ row }">
            <div>{{ row.recipient }}</div>
            <div class="text-sm text-gray-400">
              {{ row.phone }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="地址信息">
          <template #default="{ row }">
            <div>
              {{ row.province }} {{ row.city }} {{ row.district }}
              {{ row.street }}
            </div>
            <div class="text-sm text-gray-400">
              {{ row.address }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="默认" width="80">
          <template #default="{ row }">
            <el-tag v-if="row.isDefault" type="success" size="small">
              是
            </el-tag>
            <el-tag v-else type="info" size="small">
              否
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" width="180">
          <template #default="{ row }">
            {{ new Date(row.createdAt).toLocaleString() }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" fixed="right">
          <template #default="{ row }">
            <el-button-group>
              <el-button
                v-if="!row.isDefault"
                type="primary"
                size="small"
                @click="handleSetDefault(row)"
              >
                设为默认
              </el-button>
              <el-button
                type="danger"
                size="small"
                @click="handleDelete(row)"
              >
                删除
              </el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>

      <div class="mt-4 flex justify-end">
        <el-pagination
          v-model:current-page="pagination.currentPage"
          v-model:page-size="pagination.pageSize"
          :total="pagination.total"
          :page-sizes="[10, 20, 50, 100]"
          layout="total, sizes, prev, pager, next"
          @size-change="handlePageChange"
          @current-change="handlePageChange"
        />
      </div>
    </AdminTableCard>

    <!-- 对话框 -->
    <el-dialog
      v-model="dialogVisible"
      :title="dialogTitle"
      width="500px"
      destroy-on-close
    >
      <el-form :model="dialogForm" label-width="100px">
        <el-form-item label="用户" required>
          <el-input v-model="dialogForm.name" placeholder="请输入用户" />
        </el-form-item>
        <el-form-item label="收件人">
          <el-input v-model="dialogForm.name" placeholder="请输入收件人" />
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="dialogForm.name" placeholder="请输入地址" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="handleSubmit">
          确定
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>
