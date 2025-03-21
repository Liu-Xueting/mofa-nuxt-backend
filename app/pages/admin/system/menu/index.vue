<!--
菜单管理
- id
- permissionId
- name
- description
- type
- icon
- path
- parentId
- order
- isExternal
- isVisible

生成一个完整的菜单列表管理界面，使用 Element Plus，组件已经默认全部导入，但需要提供模拟数据，不要从其他地方导入数据。
全部使用 Tailwind CSS 进行样式布局，不要使用自定义类名，可以使用 Daisy UI 提供的工具类辅助编写样式。
-->
<script setup lang="ts">
import { createMenu, searchMenu, updateMenu } from '~/api/menu-api'
import { searchPermission } from '~/api/permission-api'

definePageMeta({ layout: 'admin' })

interface MenuItem {
  id: number
  permissionId: string
  name: string
  description: string
  type: 'menu' | 'button'
  icon: string
  path: string
  parentId: number | null
  order: number
  isExternal: boolean
  isVisible: boolean
}

const menuData = ref<MenuItem[]>([
  {
    id: 1,
    permissionId: 'system',
    name: '系统管理',
    description: '系统管理模块',
    type: 'menu',
    icon: 'setting',
    path: '/admin/system',
    parentId: null,
    order: 1,
    isExternal: false,
    isVisible: true,
  },
  {
    id: 2,
    permissionId: 'user',
    name: '用户管理',
    description: '用户管理模块',
    type: 'menu',
    icon: 'user',
    path: '/admin/user',
    parentId: 1,
    order: 1,
    isExternal: false,
    isVisible: true,
  },
])

// 表格加载状态
const loading = ref(false)
const dialogVisible = ref(false)
const isEdit = ref(false)
const searchQuery = ref('')
const total = ref(100)
const currentPage = ref(1)
const pageSize = ref(10)
const editId = ref('')

const menuList = ref<MenuVO[]>([])

const form = ref({
  permissionId: '',
  name: '',
  description: '',
  type: '',
  icon: '',
  path: '',
  parentId: '',
  order: 1,
  isExternal: false,
  isVisible: false,
})

interface Permission {
  label: number
  value: string
}

const permissionsValue = ref<Permission[]>([])
const permissions = ref<PermissionVO[]>([])

// 获取权限列表
async function searchPermissions() {
  // 搜索权限
  const res = await searchPermission({
    name: '',
  })
  permissions.value = res.data.list
  permissionsValue.value = res.data.list.map((item: any) => ({
    label: item.name,
    value: item.id,
  }))
}
// 获取权限名称  得不到名称
function getPermissionName(permissionId: string) {
  if (!permissionId) {
    return ''
  }
  const permission = permissions.value.find(item => item.id === permissionId)
  return permission ? permission.name : ''
}

// 计算当前行的序号
function getIndex(index: number) {
  return (currentPage.value - 1) * pageSize.value + index + 1
}

async function handleSearch() {
  // 实现搜索逻辑
  loading.value = true
  try {
    const res = await searchMenu({
      keyWord: searchQuery.value,
    }, {
      page: currentPage.value,
      size: pageSize.value,
    })
    menuList.value = res.data.list
    total.value = res.data.total
  } finally {
    setTimeout(() => {
      loading.value = false
    }, 300)
  }
}

function handleAdd() {
  isEdit.value = false
  form.value = {
    permissionId: '',
    name: '',
    description: '',
    type: '',
    icon: '',
    path: '',
    parentId: '',
    order: 1,
    isExternal: false,
    isVisible: false,
  }
  dialogVisible.value = true
}

function handleEdit(index: number) {
  const { id, permissionId, name, description, type, icon, path, parentId, order, isExternal, isVisible } = menuList.value[index]!
  form.value = {
    permissionId: permissionId || '',
    name,
    description: description || '',
    type: type || '',
    icon: icon || '',
    path: path || '',
    parentId: parentId || '',
    order: order || 1,
    isExternal: isExternal || false,
    isVisible: isVisible || true,
  }
  isEdit.value = true
  dialogVisible.value = true
  editId.value = id
}

function handleDelete(row: MenuItem) {
  ElMessageBox.confirm('确认删除该菜单吗？', '提示', {
    type: 'warning',
  }).then(() => {
    const index = menuData.value.findIndex(item => item.id === row.id)
    if (index > -1) {
      menuData.value.splice(index, 1)
      ElMessage.success('删除成功')
    }
  })
}

async function handleSubmit() {
  if (isEdit.value) {
    const res = await updateMenu(editId.value, {
      permissionId: form.value.permissionId || undefined,
      name: form.value.name || undefined,
      description: form.value.description || undefined,
      type: form.value.type || undefined,
      icon: form.value.icon || undefined,
      path: form.value.path || undefined,
      parentId: form.value.parentId || undefined,
      order: form.value.order || undefined,
      isExternal: form.value.isExternal || undefined,
      isVisible: form.value.isVisible || undefined,
    })
    if (res.code === 0) {
      ElMessage.success('更新成功')
      handleSearch()
    } else {
      ElMessage.error('更新失败')
    }
  } else {
    const res = await createMenu({
      permissionId: form.value.permissionId,
      name: form.value.name,
      description: form.value.description || undefined,
      type: form.value.type,
      icon: form.value.icon || undefined,
      path: form.value.path,
      parentId: form.value.parentId || undefined,
      order: form.value.order || undefined,
      isExternal: form.value.isExternal || undefined,
      isVisible: form.value.isVisible || undefined,
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

function handleReset() {
  searchQuery.value = ''
  handleSearch()
}

onMounted(() => {
  handleSearch()
  searchPermissions()
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
            <el-input v-model="searchQuery" placeholder="搜索菜单名称或描述">
              <template #prefix>
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
        <el-button type="primary" @click="handleAdd()">
          新增根菜单
        </el-button>
      </template>

      <el-table
        v-loading="loading"
        :data="menuList"
        row-key="id"
        border
        default-expand-all
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
        <el-table-column type="index" label="序号" width="80" align="center">
          <template #default="{ $index }">
            {{ getIndex($index) }}
          </template>
        </el-table-column>
        <el-table-column prop="name" label="菜单名称" width="180" />
        <el-table-column label="权限标识" width="200">
          <template #default="{ row }">
            {{ getPermissionName(row.permissionId) }}
          </template>
        </el-table-column>
        <el-table-column prop="path" label="路由路径" />
        <el-table-column prop="description" label="描述" />
        <el-table-column prop="icon" label="图标" width="100" />
        <el-table-column prop="order" label="排序" width="80" />
        <el-table-column prop="type" label="类型" width="100">
          <template #default="{ row }">
            <el-tag :type="row.type === 'menu' ? undefined : 'info'">
              {{ row.type === 'menu' ? '菜单' : '按钮' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template #default="{ row, $index }">
            <el-button-group>
              <el-button size="small" @click="handleAdd()">
                新增
              </el-button>
              <el-button size="small" type="primary" @click="handleEdit($index)">
                编辑
              </el-button>
              <el-button size="small" type="danger" @click="handleDelete(row)">
                删除
              </el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
    </AdminTableCard>
    <el-dialog
      v-model="dialogVisible"
      :title="isEdit ? '编辑菜单' : '新增菜单'"
      width="500px"
    >
      <el-form :model="form" label-width="100px">
        <el-form-item label="菜单名称">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="权限标识">
          <el-select
            v-model="form.permissionId"
            placeholder="请选择权限"
            @focus="searchPermissions"
          >
            <el-option
              v-for="item in permissionsValue"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="路由路径">
          <el-input v-model="form.path" />
        </el-form-item>
        <el-form-item label="图标">
          <el-input v-model="form.icon" />
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="form.description" type="textarea" />
        </el-form-item>
        <el-form-item label="类型">
          <el-radio-group v-model="form.type">
            <el-radio label="menu" value="menu">
              菜单
            </el-radio>
            <el-radio label="button" value="button">
              按钮
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="排序">
          <el-input-number v-model="form.order" :min="1" />
        </el-form-item>
        <el-form-item label="是否外链">
          <el-switch v-model="form.isExternal" />
        </el-form-item>
        <el-form-item label="是否可见">
          <el-switch v-model="form.isVisible" />
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
