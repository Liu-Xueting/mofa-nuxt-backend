<!--
角色列表
- id
- name
- description
- permissions
- isDeleted
- createdAt
- createdBy
- updatedAt
- updatedBy

生成一个完整的角色列表管理界面，使用 Element Plus，组件已经默认全部导入，但需要提供模拟数据，不要从其他地方导入数据。
全部使用 Tailwind CSS 进行样式布局，不要使用自定义类名，可以使用 Daisy UI 提供的工具类辅助编写样式。
不要修改原有代码，从 `INSERT_HERE` 处开始编写。
-->
<script setup lang="ts">
import { searchPermission } from '~/api/permission-api'
import { createRole, searchRole, updateRole } from '~/api/role-api'

definePageMeta({ layout: 'admin' })

const searchQuery = ref('')
const dialogVisible = ref(false)
const editingRole = ref({
  id: '',
  name: '',
  description: '',
  permissions: [''],
})
const total = ref(100)
const currentPage = ref(1)
const pageSize = ref(10)

// 模拟数据
// const roles = ref([
//   {
//     id: 1,
//     name: '超级管理员',
//     description: '系统最高权限管理员',
//     permissions: ['all'],
//     isDeleted: false,
//     createdAt: '2024-01-15',
//     createdBy: 'System',
//     updatedAt: '2024-01-15',
//     updatedBy: 'System',
//   },
//   {
//     id: 2,
//     name: '内容编辑',
//     description: '负责内容管理和编辑',
//     permissions: ['content.read', 'content.write'],
//     isDeleted: false,
//     createdAt: '2024-01-15',
//     createdBy: 'System',
//     updatedAt: '2024-01-15',
//     updatedBy: 'System',
//   },
// ])

const roleList = ref<RoleVO[]>([])

// 表格加载状态
const loading = ref(false)

interface Permission {
  label: number
  value: string
}

// 计算当前行的序号
function getIndex(index: number) {
  return (currentPage.value - 1) * pageSize.value + index + 1
}

const permissionsValue = ref<Permission[]>([])

function handleSizeChange(val: number) {
  pageSize.value = val
  handleSearch()
}

function handleCurrentChange(val: number) {
  currentPage.value = val
  handleSearch()
}

async function handleSearch() {
  // 实现搜索逻辑
  loading.value = true
  try {
    const res = await searchRole({
      keyWord: searchQuery.value,
    }, {
      page: currentPage.value,
      size: pageSize.value,
    })
    roleList.value = res.data.list
    total.value = res.data.total
  } finally {
    setTimeout(() => {
      loading.value = false
    }, 300)
  }
}

const filteredRoles = computed(() => {
  return roleList.value.filter(role =>
    role.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    || (role.description && role.description.toLowerCase().includes(searchQuery.value.toLowerCase())),
  )
})

function handleEdit(role: any) {
  editingRole.value = { ...role }
  dialogVisible.value = true
}

function handleDelete(_role: any) {
  ElMessageBox.confirm(
    '确认删除该角色吗？',
    '警告',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    },
  ).then(() => {
    // roles.value = roles.value.filter(r => r.id !== role.id)
    ElMessage.success('删除成功')
  }).catch(() => { })
}

async function handleSave() {
  if (editingRole.value.id) {
    // 编辑
    const res = await updateRole(editingRole.value.id, {
      name: editingRole.value.name || undefined,
      description: editingRole.value.description || undefined,
      permissions: editingRole.value.permissions || undefined,
    })
    if (res.code === 0) {
      ElMessage.success('修改成功')
      handleSearch()
    } else {
      ElMessage.error('修改失败')
    }
  } else {
    // 添加
    const res = await createRole({
      name: editingRole.value.name,
      description: editingRole.value.description || undefined,
      permissions: editingRole.value.permissions || undefined,
    })
    if (res.code === 0) {
      ElMessage.success('添加成功')
      handleSearch()
    } else {
      ElMessage.error('添加失败')
    }
  }
  dialogVisible.value = false
}

function handleAdd() {
  editingRole.value = {
    id: '',
    name: '',
    description: '',
    permissions: [],
  }
  dialogVisible.value = true
}

function handleReset() {
  searchQuery.value = ''
  handleSearch()
}

async function searchPermissions() {
  // 搜索权限
  const res = await searchPermission({
    name: '',
  })
  permissionsValue.value = res.data.list.map((item: any) => ({
    label: item.name,
    value: item.id,
  }))
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
          <el-form-item>
            <el-input v-model="searchQuery" placeholder="搜索角色名称或描述">
              <template #prefix>
                <el-icon><el-icon-search /></el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">
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
          新增角色
        </el-button>
      </template>

      <el-table v-loading="loading" :data="filteredRoles" border class="w-full">
        <el-table-column type="index" label="序号" width="80" align="center">
          <template #default="{ $index }">
            {{ getIndex($index) }}
          </template>
        </el-table-column>
        <el-table-column prop="name" label="角色名称" />
        <el-table-column prop="description" label="描述" />
        <el-table-column prop="permissions" label="权限" />
        <el-table-column prop="createdAt" label="创建时间" width="240" />
        <el-table-column label="更新时间" prop="updatedAt" width="240" />
        <el-table-column prop="createdBy" label="创建人" width="180" />
        <el-table-column label="操作" width="180">
          <template #default="{ row }">
            <el-button type="primary" size="small" @click="handleEdit(row)">
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

    <el-dialog v-model="dialogVisible" :title="editingRole?.id ? '编辑角色' : '新建角色'" width="500px">
      <el-form v-if="editingRole" label-width="100px">
        <el-form-item label="角色名称">
          <el-input v-model="editingRole.name" />
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="editingRole.description" type="textarea" :rows="3" />
        </el-form-item>
        <el-form-item label="权限">
          <el-select v-model="editingRole.permissions" multiple placeholder="请选择权限" @focus="searchPermissions">
            <el-option v-for="item in permissionsValue" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span>
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleSave">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
