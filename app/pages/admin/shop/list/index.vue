<!--
店铺列表
生成一个完整的角色列表管理界面，使用 Element Plus，组件已经默认全部导入，但需要提供模拟数据，不要从其他地方导入数据。
全部使用 Tailwind CSS 进行样式布局，不要使用自定义类名，可以使用 Daisy UI 提供的工具类辅助编写样式。
不要修改原有代码，从 `INSERT_HERE` 处开始编写。不要给页面添加额外页边距，需要操作时使用小按钮。
参照 `schema.prisma` 中的模型 `Shop` 来设计模拟数据。
-->
<script setup lang="ts">
import { deleteShop, searchShops, updateShop } from '~/api/shop-api'

definePageMeta({ layout: 'admin' })

// 模拟店铺数据
// const shops = ref([
//   {
//     id: '1',
//     name: '优品生活馆',
//     userId: 'user1',
//     description: '提供优质生活用品',
//     qualification: '营业执照xxx',
//     province: '广东省',
//     city: '深圳市',
//     district: '南山区',
//     street: '科技园路',
//     address: '科技园路1号',
//     status: 'ACTIVE',
//     tags: ['生活用品', '家居'],
//     remark: '优质商家',
//     createdAt: '2024-01-01',
//     updatedAt: '2024-01-10',
//   },
//   {
//     id: '2',
//     name: '美食天地',
//     userId: 'user2',
//     description: '各地美食汇集',
//     qualification: '营业执照yyy',
//     province: '广东省',
//     city: '广州市',
//     district: '天河区',
//     street: '天河路',
//     address: '天河路123号',
//     status: 'PENDING',
//     tags: ['美食', '零食'],
//     remark: '新入驻商家',
//     createdAt: '2024-01-05',
//     updatedAt: '2024-01-05',
//   },
// ])

// 状态选项
const statusOptions = [
  { value: 'ACTIVE', label: '正常' },
  { value: 'PENDING', label: '待审核' },
  { value: 'REJECTED', label: '已拒绝' },
]

// 搜索相关
const searchForm = ref({
  keyword: '',
  status: '',
  dateRange: [],
})

const editId = ref('')

const editForm = ref({
  name: '',
  description: '',
  qualification: '',
  province: '',
  city: '',
  district: '',
  street: '',
  address: '',
})

// 分页相关
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(100)

// 计算当前行的序号
function getIndex(index: number) {
  return (currentPage.value - 1) * pageSize.value + index + 1
}

// 表格加载状态
const loading = ref(false)

const dialogVisible = ref(false)
const formLabelWidth = '120px'
const shopList = ref<ShopVO[]>([])

// 处理搜索
async function handleSearch() {
  loading.value = true
  try {
    const res = await searchShops({
      keyword: searchForm.value.keyword,
      status: searchForm.value.status || undefined as any,
      createdAtFrom: searchForm.value.dateRange[0],
      createdAtTo: searchForm.value.dateRange[1],
    }, {
      page: currentPage.value,
      size: pageSize.value,
    })
    shopList.value = res.data.list
    total.value = res.data.total
  } finally {
    setTimeout(() => {
      loading.value = false
    }, 300)
  }
}

// 处理重置
function handleReset() {
  searchForm.value = {
    keyword: '',
    status: '',
    dateRange: [],
  }
}

// 处理编辑
function handleEdit(index: number) {
  const { id, name, description, qualification, province, city, district, street, address } = shopList.value[index]!
  editForm.value = {
    name: name || '',
    description: description || '',
    qualification: qualification || '',
    province: province || '',
    city: city || '',
    district: district || '',
    street: street || '',
    address: address || '',
  }
  dialogVisible.value = true
  editId.value = id
}

async function handleEditSubmit() {
  const res = await updateShop(editId.value, {
    name: editForm.value.name || '',
    description: editForm.value.description || undefined,
    qualification: editForm.value.qualification || undefined,
    province: editForm.value.province || undefined,
    city: editForm.value.city || undefined,
    district: editForm.value.district || undefined,
    street: editForm.value.street || undefined,
    address: editForm.value.address || undefined,
  })
  if (res.code === 0) {
    handleSearch()
    ElMessage.success('编辑成功')
  } else {
    ElMessage.error('编辑失败')
  }
  dialogVisible.value = false
}

// 处理删除
function handleDelete(id: string) {
  ElMessageBox.confirm('确认删除该店铺？', '提示', {
    type: 'warning',
  }).then(async () => {
    // 实现删除逻辑
    const res = await deleteShop(id)
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
      <Title>{{ $t('admin.shop.list.title') }}</Title>
    </Head>

    <AdminTableCard>
      <template #header>
        <el-form :model="searchForm" inline>
          <el-form-item label="店铺名称">
            <el-input
              v-model="searchForm.keyword"
              placeholder="请输入店铺名称"
              clearable
            />
          </el-form-item>
          <el-form-item label="状态">
            <el-select
              v-model="searchForm.status"
              placeholder="请选择状态"
              clearable
            >
              <el-option
                v-for="item in statusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item>
            <div class="flex gap-2">
              <el-button type="primary" size="small" @click="handleSearch">
                搜索
              </el-button>
              <el-button size="small" @click="handleReset">
                重置
              </el-button>
            </div>
          </el-form-item>
        </el-form>
      </template>

      <el-table v-loading="loading" :data="shopList" style="width: 100%" stripe>
        <el-table-column type="index" label="序号" width="80" align="center">
          <template #default="{ $index }">
            {{ getIndex($index) }}
          </template>
        </el-table-column>
        <el-table-column prop="name" label="店铺名称" width="180" />
        <el-table-column prop="description" label="描述" />
        <el-table-column label="省/市/区（县）">
          <template #default="{ row }">
            <div>{{ row.province }}{{ row.city }}{{ row.district }}</div>
          </template>
        </el-table-column>
        <el-table-column label="详细地址">
          <template #default="{ row }">
            <div>{{ row.street }}{{ row.address }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" />
        <el-table-column prop="createdAt" label="创建时间" width="240" />
        <el-table-column label="操作" width="200">
          <template #default="{ row, $index }">
            <div class="flex gap-2">
              <el-button
                type="primary"
                size="small"
                @click="handleEdit($index)"
              >
                编辑
              </el-button>
              <el-button
                type="danger"
                size="small"
                @click="handleDelete(row.id)"
              >
                删除
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="mt-4 flex justify-end">
        <el-pagination background layout="prev, pager, next" :total="1000" />
      </div>
    </AdminTableCard>

    <!-- 表单对话框 -->
    <el-dialog v-model="dialogVisible" title="编辑店铺" width="500">
      <el-form :model="editForm" :label-width="formLabelWidth">
        <el-form-item label="店铺名">
          <el-input v-model="editForm.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="editForm.description" autocomplete="off" />
        </el-form-item>
        <el-form-item label="营业执照">
          <el-input v-model="editForm.qualification" autocomplete="off" />
        </el-form-item>
        <el-form-item label="省">
          <el-input v-model="editForm.province" autocomplete="off" />
        </el-form-item>
        <el-form-item label="市">
          <el-input v-model="editForm.city" autocomplete="off" />
        </el-form-item>
        <el-form-item label="区">
          <el-input v-model="editForm.district" autocomplete="off" />
        </el-form-item>
        <el-form-item label="街道">
          <el-input v-model="editForm.street" autocomplete="off" />
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="editForm.address" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span>
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleEditSubmit">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
