<!--
权限列表
- id
- name
- description
- permKey
- isDeleted
- createdAt
- createdBy
- updatedAt
- updatedBy

生成一个完整的权限列表管理界面，使用 Element Plus，组件已经默认全部导入，但需要提供模拟数据，不要从其他地方导入数据。
全部使用 Tailwind CSS 进行样式布局，不要使用自定义类名，可以使用 Daisy UI 提供的工具类辅助编写样式。
不要修改原有代码，从 `INSERT_HERE` 处开始编写。
-->
<script setup lang="ts">
import { createPermission, deletePermission, searchPermission, updatePermission } from '~/api/permission-api'

definePageMeta({ layout: 'admin' })

// 模拟数据和状态管理
// const permissions = ref([
//   {
//     id: 1,
//     name: '用户管理',
//     description: '管理系统用户',
//     permKey: 'user:manage',
//     isDeleted: false,
//     createdAt: '2024-01-01',
//     createdBy: 'admin',
//     updatedAt: '2024-01-01',
//     updatedBy: 'admin',
//   },
//   // 更多模拟数据...
// ])

const permissionList = ref<PermissionVO[]>([])
// 当前编辑id
const editId = ref('')

const searchQuery = ref('')
const total = ref(100)
const currentPage = ref(1)
const pageSize = ref(10)
const dialogVisible = ref(false)
const isAdd = ref(true)

const formData = ref({
  name: '',
  description: '',
  permKey: '',
})

// 表格加载状态
const loading = ref(false)

async function handleSearch() {
  // 实现搜索逻辑
  loading.value = true
  try {
    const res = await searchPermission({
      name: searchQuery.value,
    }, {
      page: currentPage.value,
      size: pageSize.value,
    })
    permissionList.value = res.data.list
    total.value = res.data.total
  } finally {
    setTimeout(() => {
      loading.value = false
    }, 300)
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

function handleReset() {
  searchQuery.value = ''
  handleSearch()
}

function handleAdd() {
  isAdd.value = true
  formData.value = {
    name: '',
    description: '',
    permKey: '',
  }
  dialogVisible.value = true
}

// 计算当前行的序号
function getIndex(index: number) {
  return (currentPage.value - 1) * pageSize.value + index + 1
}

function handleEdit(index: number) {
  const { id, name, description, permKey } = permissionList.value[index]!
  isAdd.value = false
  formData.value = {
    name: name || '',
    description: description || '',
    permKey: permKey || '',
  }
  editId.value = id
  dialogVisible.value = true
}

function handleDelete(_row: any) {
  ElMessageBox.confirm('确认删除该权限？', '提示', {
    type: 'warning',
  }).then(async () => {
    // 实现删除逻辑
    const res = await deletePermission(_row.id)
    if (res.code === 0) {
      handleSearch()
      ElMessage.success('删除成功')
    } else {
      ElMessage.error('删除失败')
    }
  })
}

async function handleSubmit() {
  // 实现提交逻辑
  if (!isAdd.value) {
    // 编辑
    dialogVisible.value = false
    const res = await updatePermission(editId.value, {
      name: formData.value.name || undefined,
      description: formData.value.description || undefined,
      permKey: formData.value.permKey || undefined,
    })
    if (res.code === 0) {
      ElMessage.success('修改成功')
      handleSearch()
    } else {
      ElMessage.error('修改失败')
    }
  } else {
    // 新增
    const res = await createPermission(formData.value)
    if (res.code === 0) {
      ElMessage.success('添加成功')
      handleSearch()
    } else {
      ElMessage.error('添加失败')
    }
  }
  dialogVisible.value = false
}

onMounted(() => {
  handleSearch()
})
</script>

<template>
  <div class="size-page">
    <Head>
      <Title>{{ $t('admin.user.title') }}</Title>
    </Head>

    <AdminTableCard>
      <template #header>
        <el-form inline>
          <el-form-item label="搜索权限">
            <el-input v-model="searchQuery" placeholder="请输入搜索权限名称或标识" @keyup.enter="handleSearch">
              <template #suffix>
                <el-icon><el-icon-search /></el-icon>
              </template>
            </el-input>
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
      <template #toolbar>
        <el-button type="primary" @click="handleAdd">
          <el-icon><el-icon-plus /></el-icon>
          新增权限
        </el-button>
      </template>

      <!-- 数据表格 -->
      <el-table v-loading="loading" :data="permissionList" border stripe>
        <el-table-column type="index" label="序号" width="80" align="center">
          <template #default="{ $index }">
            {{ getIndex($index) }}
          </template>
        </el-table-column>
        <el-table-column label="权限名称" prop="name" />
        <el-table-column label="权限标识" prop="permKey" />
        <el-table-column label="描述" prop="description" />
        <el-table-column label="创建时间" prop="createdAt" width="240" />
        <el-table-column label="更新时间" prop="updatedAt" width="240" />
        <el-table-column label="操作" width="180">
          <template #default="{ row, $index }">
            <el-button type="primary" size="small" @click="handleEdit($index)">
              编辑
            </el-button>
            <el-button type="danger" size="small" @click="handleDelete(row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="flex justify-end">
        <el-pagination
          v-model:current-page="currentPage" v-model:page-size="pageSize" :total="total" :page-sizes="[10, 20, 50, 100]"
          layout="total, prev, pager, next" @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </AdminTableCard>

    <!-- 表单对话框 -->
    <el-dialog v-model="dialogVisible" :title="isAdd ? '添加权限' : '修改权限'" width="500px">
      <el-form :model="formData" label-width="100px">
        <el-form-item label="权限名称">
          <el-input v-model="formData.name" />
        </el-form-item>
        <el-form-item label="权限标识">
          <el-input v-model="formData.permKey" />
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="formData.description" type="textarea" :rows="3" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span>
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleSubmit">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
