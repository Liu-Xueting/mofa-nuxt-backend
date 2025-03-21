<!--
用户列表
-->
<script setup lang="ts">
import { createUser, deleteUser, searchUsers, updateUser, updateUserStatus } from '~/api/user-api'

definePageMeta({ layout: 'admin' })

const userList = ref<UserVO[]>([])

// 分页相关
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(100)

// 搜索相关
const searchForm = ref({
  keyword: '',
  status: '',
  dateRange: [],
})

// 表单对话框
const dialogAddVisible = ref(false)
const dialogEditVisible = ref(false)

const userAdd = ref({
  username: '',
  password: '',
  email: '',
})

const userEdit = ref({
  avatar: '',
  nickname: '',
  email: '',
  birthday: '',
  gender: '',
})
const options = [
  {
    value: '女',
    label: '女',
  },
  {
    value: '男',
    label: '男',
  },
]
const formLabelWidth = '120px'
// 当前编辑id
const editId = ref('')

// 表格加载状态
const loading = ref(false)

// 表格操作方法
async function handleSearch() {
  loading.value = true
  try {
    const res = await searchUsers({
      keyword: searchForm.value.keyword,
      status: searchForm.value.status || undefined as any,
      createdAtFrom: searchForm.value.dateRange[0],
      createdAtTo: searchForm.value.dateRange[1],
    }, {
      page: currentPage.value,
      size: pageSize.value,
    })
    userList.value = res.data.list
    total.value = res.data.total
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
  handleSearch()
}

function handleSizeChange(val: number) {
  pageSize.value = val
  handleSearch()
}

function handleCurrentChange(val: number) {
  currentPage.value = val
  handleSearch()
}

// 计算当前行的序号
function getIndex(index: number) {
  return (currentPage.value - 1) * pageSize.value + index + 1
}

async function handleStatusChange(id: string) {
  // 实现更改状态逻辑
  const res = await updateUserStatus(id, {
    status: userList.value.find(item => item.id === id)!.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE',
  })
  if (res.code === 0) {
    ElMessage.success('状态已更改')
    handleSearch()
  } else {
    ElMessage.error('状态更改失败')
  }
}

function formatStatus(status: string): { text: string, type: 'success' | 'info' | 'danger' } {
  const map: Record<string, { text: string, type: 'success' | 'info' | 'danger' }> = {
    ACTIVE: { text: '正常', type: 'success' },
    INACTIVE: { text: '禁用', type: 'info' },
    FORBIDDEN: { text: '封禁', type: 'danger' },
  }
  return map[status] || { text: '未知', type: 'info' }
}

async function handleAddSubmit() {
  // 实现提交逻辑
  dialogAddVisible.value = false
  const res = await createUser(userAdd.value)
  if (res.code === 0) {
    ElMessage.success('添加成功')
    handleSearch()
  } else {
    ElMessage.error('添加失败')
  }
}

async function handleEditSubmit() {
  // 实现提交逻辑
  dialogEditVisible.value = false
  const res = await updateUser(editId.value, {
    avatar: userEdit.value.avatar || undefined,
    nickname: userEdit.value.nickname || undefined,
    email: userEdit.value.email || undefined,
    birthday: userEdit.value.birthday || undefined,
  })
  if (res.code === 0) {
    ElMessage.success('修改成功')
    handleSearch()
  } else {
    ElMessage.error('修改失败')
  }
}

async function editUser(index: number) {
  const { id, avatar, email, nickname, birthday, gender } = userList.value[index]!
  userEdit.value = {
    avatar: avatar || '',
    nickname: nickname || '',
    email: email || '',
    gender: gender || '',
    birthday: birthday || '',
  }
  dialogEditVisible.value = true
  editId.value = id
}

function addUser() {
  userAdd.value = {
    username: '',
    password: '',
    email: '',
  }
  dialogAddVisible.value = true
}

async function handleDelete(id: string) {
  ElMessageBox.confirm('确认删除该用户？', '提示', {
    type: 'warning',
  }).then(async () => {
    // 实现删除逻辑
    const res = await deleteUser(id)
    if (res.code === 0) {
      ElMessage.success('删除成功')
      handleSearch()
    } else {
      ElMessage.error('删除失败')
    }
  })
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
        <el-form :model="searchForm" inline>
          <el-form-item label="关键词搜索">
            <el-input v-model="searchForm.keyword" placeholder="用户名/手机" />
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="searchForm.status" placeholder="请选择状态">
              <el-option label="正常" value="1" />
              <el-option label="禁用" value="0" />
            </el-select>
          </el-form-item>
          <el-form-item label="注册时间">
            <el-date-picker
              v-model="searchForm.dateRange" type="daterange" range-separator="-" start-placeholder="开始日期"
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
      <template #toolbar>
        <el-button type="primary" @click="addUser">
          <el-icon><el-icon-plus /></el-icon>
          新增用户
        </el-button>
      </template>

      <el-table v-loading="loading" :data="userList" border stripe class="w-full">
        <el-table-column type="selection" width="55" />
        <el-table-column type="index" label="序号" width="80" align="center">
          <template #default="{ $index }">
            {{ getIndex($index) }}
          </template>
        </el-table-column>
        <el-table-column label="用户信息" min-width="100">
          <template #default="{ row }">
            <div class="flex items-center gap-3">
              <el-avatar :size="40" :src="row.avatar" />
              <div>
                <div class="font-medium">
                  {{ row.nickname }}
                </div>
                <div class="text-sm text-gray-500">
                  {{ row.username }}
                </div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="email" label="邮箱" />
        <el-table-column prop="phone" label="手机" />
        <el-table-column prop="nickname" label="昵称" />
        <el-table-column label="状态" width="200">
          <template #default="{ row }">
            <div class="flex items-center gap-4">
              <!-- <el-tag :type="row.status === 'ACTIVE' ? 'success' : 'danger'">
                {{ row.status === 'ACTIVE' ? '正常' : '禁用' }}
              </el-tag> -->
              <div class="flex items-center gap-4">
                <el-tag :type="formatStatus(row.status).type" size="small">
                  {{ formatStatus(row.status).text }}
                </el-tag>

                <el-button
                  size="small"
                  type="primary"
                  @click="handleStatusChange(row.id)"
                >
                  {{ row.status === 'ACTIVE' ? '禁用' : '启用' }}
                </el-button>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="lastLoginAt" label="最后登录" width="240" />
        <el-table-column label="操作" width="200" fixed="right">
          <template #default="{ row, $index }">
            <el-button-group>
              <el-button size="small" @click="editUser($index)">
                编辑
              </el-button>
              <el-button size="small" type="primary">
                密码
              </el-button>
              <el-button size="small" type="danger" @click="handleDelete(row.id)">
                删除
              </el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="mt-4 flex justify-end">
        <el-pagination
          v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[10, 20, 50, 100]"
          :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange"
        />
      </div>
    </AdminTableCard>

    <!-- 表单对话框 -->
    <el-dialog v-model="dialogAddVisible" title="新增用户" width="500">
      <el-form :model="userAdd" :label-width="formLabelWidth">
        <el-form-item label="用户名">
          <el-input v-model="userAdd.username" autocomplete="off" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="userAdd.password" type="password" autocomplete="off" />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="userAdd.email" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span>
          <el-button @click="dialogAddVisible = false">取消</el-button>
          <el-button type="primary" @click="handleAddSubmit">确认</el-button>
        </span>
      </template>
    </el-dialog>

    <el-dialog v-model="dialogEditVisible" title="编辑用户" width="500">
      <el-form :model="userEdit" :label-width="formLabelWidth">
        <el-form-item label="头像">
          <el-input v-model="userEdit.avatar" autocomplete="off" />
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="userEdit.nickname" autocomplete="off" />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="userEdit.email" autocomplete="off" />
        </el-form-item>
        <el-form-item label="生日">
          <el-date-picker
            v-model="userEdit.birthday"
            type="date"
            placeholder="Pick a day"
            size="default"
          />
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="userEdit.gender" placeholder="Select" style="width: 240px">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span>
          <el-button @click="dialogEditVisible = false">取消</el-button>
          <el-button type="primary" @click="handleEditSubmit">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
