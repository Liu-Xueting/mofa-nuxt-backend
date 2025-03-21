<!--
商品分类
- 生成一个完整的商品分类管理界面，使用 Element Plus，组件已经默认全部导入，请使用 kebab-case 命名。需要使用图标时，可使用 `el-icon` 作为图标组件前缀，如 `<el-icon-user />`。需要提供模拟数据，不要从其他地方导入数据。使用全局对象 `ElMessage` 来弹出消息。
- 全部使用 Tailwind CSS 进行样式布局，不要使用自定义类名。不要给页面添加额外页边距，在表格中需要操作时使用小按钮。顶部操作和搜索栏使用白色卡片包裹。给表格添加索引列（序号）列，并添加分页器。
- 参照 `schema.prisma` 中的模型 `ProductCategory` 来设计模拟数据。
- 不要修改原有代码，从 `INSERT_HERE` 处开始编写。
-->
<script setup lang="ts">
import { createProductCategory, deleteProductCategory, searchProductCategories, updateProductCategory } from '~/api/product-category-api'

definePageMeta({ layout: 'admin' })

interface ProductCategory {
  id: string
  name: string
  description?: string
  isDeleted: boolean
  createdAt: string
  updatedAt: string
}

const searchForm = ref({
  keyword: '',
  isDeleted: undefined as boolean | undefined,
  dateRange: [] as string[],
})

// const tableData = ref<ProductCategory[]>([
//   {
//     id: '1',
//     name: '手机数码',
//     description: '手机、平板电脑等数码产品',
//     isDeleted: false,
//     createdAt: '2024-01-15 12:00:00',
//     updatedAt: '2024-01-15 12:00:00',
//   },
//   {
//     id: '2',
//     name: '家用电器',
//     description: '冰箱、洗衣机等家用电器',
//     isDeleted: false,
//     createdAt: '2024-01-15 12:00:00',
//     updatedAt: '2024-01-15 12:00:00',
//   },
//   {
//     id: '3',
//     name: '服装服饰',
//     description: '男装、女装、童装等服装类目',
//     isDeleted: false,
//     createdAt: '2024-01-15 12:00:00',
//     updatedAt: '2024-01-15 12:00:00',
//   },
// ])

const dialogVisible = ref(false)
const dialogTitle = ref('')
// const formMode = ref<'add' | 'edit'>('add')
const form = ref({
  id: '',
  name: '',
  description: '',
})

const rules = {
  name: [{ required: true, message: '请输入分类名称', trigger: 'blur' }],
}

const formRef = ref()

// 分页相关
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(100)

const productCategoryList = ref<ProductCategory[]>([])

// 表格加载状态
const loading = ref(false)

// 表格操作方法
async function handleSearch() {
  loading.value = true
  try {
    const res = await searchProductCategories({
      keyword: searchForm.value.keyword,
      isDeleted: searchForm.value.isDeleted || undefined,
      createdAtFrom: searchForm.value.dateRange[0],
      createdAtTo: searchForm.value.dateRange[1],
    }, {
      page: currentPage.value,
      size: pageSize.value,
    })
    productCategoryList.value = res.data.list.map((item: any) => ({
      ...item,
      description: item.description || undefined,
    }))
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
    isDeleted: undefined as boolean | undefined,
    dateRange: [] as string[],
  }
}

function handleAdd() {
  dialogTitle.value = '添加分类'
  // formMode.value = 'add'
  form.value = {
    id: '',
    name: '',
    description: '',
  }
  dialogVisible.value = true
}

function handleEdit(row: ProductCategory) {
  dialogTitle.value = '编辑分类'
  // formMode.value = 'edit'
  form.value = {
    id: row.id,
    name: row.name,
    description: row.description || '',
  }
  dialogVisible.value = true
}

function handleDelete(id: string) {
  ElMessageBox.confirm('确认删除该分类吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(async () => {
    const res = await deleteProductCategory(id)
    if (res.code === 0) {
      handleSearch()
      ElMessage.success('删除成功')
    } else {
      ElMessage.error(res.msg)
    }
  })
}

async function handleSubmit() {
  if (!formRef.value) {
    return
  }
  await formRef.value.validate(async (valid: boolean) => {
    if (valid) {
      if (form.value.id === '') {
        const res = await createProductCategory(form.value)
        if (res.code === 0) {
          handleSearch()
          ElMessage.success('添加成功')
        } else {
          ElMessage.error(res.msg)
        }
      } else {
        const res = await updateProductCategory(form.value.id, {
          name: form.value.name || undefined,
          description: form.value.description || undefined,
        })
        if (res.code === 0) {
          handleSearch()
          ElMessage.success('修改成功')
        } else {
          ElMessage.error(res.msg)
        }
      }
      dialogVisible.value = false
    }
  })
}

function handleSizeChange(val: number) {
  pageSize.value = val
  handleSearch()
}

function handleCurrentChange(val: number) {
  currentPage.value = val
  handleSearch()
}

onMounted(() => {
  handleSearch()
})
</script>

<template>
  <div class="size-page">
    <Head>
      <Title>{{ $t('admin.product.category.title') }}</Title>
    </Head>

    <AdminTableCard>
      <template #header>
        <!-- 搜索表单 -->
        <el-form :model="searchForm" inline>
          <el-form-item label="分类名称">
            <el-input v-model="searchForm.keyword" placeholder="请输入分类名称" />
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="searchForm.isDeleted" placeholder="请选择状态">
              <el-option :value="false" label="正常" />
              <el-option :value="true" label="已删除" />
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
              <el-icon-search class="mr-1" />搜索
            </el-button>
            <el-button @click="handleReset">
              <el-icon-refresh class="mr-1" />重置
            </el-button>
          </el-form-item>
        </el-form>
      </template>

      <template #toolbar>
        <div class="mb-4">
          <el-button type="primary" @click="handleAdd">
            <el-icon-plus class="mr-1" />添加
          </el-button>
        </div>
      </template>

      <!-- 数据表格 -->
      <el-table v-loading="loading" :data="productCategoryList" border>
        <el-table-column type="index" label="序号" width="60" />
        <el-table-column prop="name" label="分类名称" min-width="120" />
        <el-table-column prop="description" label="描述" min-width="180" show-overflow-tooltip />
        <el-table-column prop="isDeleted" label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="row.isDeleted ? 'danger' : 'success'">
              {{ row.isDeleted ? '已删除' : '正常' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createdAt" label="创建时间" width="240" />
        <el-table-column prop="updatedAt" label="更新时间" width="240" />
        <el-table-column label="操作" width="150" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" size="small" @click="handleEdit(row)">
              编辑
            </el-button>
            <el-button type="danger" size="small" @click="handleDelete(row.id)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="mt-4 flex justify-end">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :total="total"
          layout="total, prev, pager, next"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </AdminTableCard>

    <!-- 表单对话框 -->
    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="500px">
      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        label-width="80px"
      >
        <el-form-item label="分类名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入分类名称" />
        </el-form-item>
        <el-form-item label="描述">
          <el-input
            v-model="form.description"
            type="textarea"
            :rows="3"
            placeholder="请输入描述"
          />
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
