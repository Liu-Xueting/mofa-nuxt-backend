<!--
商品标签
- 生成一个完整的商品标签管理界面，使用 Element Plus，组件已经默认全部导入，请使用 kebab-case 命名。需要使用图标时，可使用 `el-icon` 作为图标组件前缀，如 `<el-icon-user />`。需要提供模拟数据，不要从其他地方导入数据。使用全局对象 `ElMessage` 来弹出消息。
- 全部使用 Tailwind CSS 进行样式布局，不要使用自定义类名。不要给页面添加额外页边距，在表格中需要操作时使用小按钮。顶部操作和搜索栏使用白色卡片包裹。给表格添加索引列（序号）列，并添加分页器。
- 参照 `schema.prisma` 中的模型 `ProductTag` 来设计模拟数据。
- 不要修改原有代码，从 `INSERT_HERE` 处开始编写。
-->
<script setup lang="ts">
import { createProductTag, deleteProductTag, searchProductTags, updateProductTag } from '~/api/product-tag-api'

definePageMeta({ layout: 'admin' })

// 模拟数据
// const mockData = ref([
//   {
//     id: '1',
//     name: '热销',
//     description: '热门销售商品',
//     isDeleted: false,
//     createdAt: '2024-01-01T00:00:00.000Z',
//     createdBy: 'admin',
//     updatedAt: '2024-01-01T00:00:00.000Z',
//     updatedBy: 'admin',
//   },
//   {
//     id: '2',
//     name: '新品',
//     description: '新上架商品',
//     isDeleted: false,
//     createdAt: '2024-01-02T00:00:00.000Z',
//     createdBy: 'admin',
//     updatedAt: '2024-01-02T00:00:00.000Z',
//     updatedBy: 'admin',
//   },
//   {
//     id: '3',
//     name: '促销',
//     description: '促销特惠商品',
//     isDeleted: false,
//     createdAt: '2024-01-03T00:00:00.000Z',
//     createdBy: 'admin',
//     updatedAt: '2024-01-03T00:00:00.000Z',
//     updatedBy: 'admin',
//   },
// ])

// 搜索表单
const searchForm = ref({
  keyword: '',
})

// 分页
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(100)

const productCategoryList = ref<ProductTagVO[]>([])

// 对话框
const dialogVisible = ref(false)
const dialogTitle = ref('添加标签')
const dialogForm = ref({
  id: '',
  name: '',
  description: '',
})
const dialogType = ref('add')

// 表格加载状态
const loading = ref(false)

// 计算当前行的序号
function getIndex(index: number) {
  return (currentPage.value - 1) * pageSize.value + index + 1
}

// 搜索方法
async function handleSearch() {
  loading.value = true
  try {
    const res = await searchProductTags({
      keyword: searchForm.value.keyword,
    }, {
      page: currentPage.value,
      size: pageSize.value,
    })
    productCategoryList.value = res.data.list
    total.value = res.data.total
  } finally {
    setTimeout(() => {
      loading.value = false
    }, 300)
  }
}

// 重置搜索
function handleReset() {
  searchForm.value = {
    keyword: '',
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

// 提交表单
async function handleSubmit() {
  if (dialogType.value === 'add') {
    const res = await createProductTag(dialogForm.value)
    if (res.code === 0) {
      handleSearch()
      ElMessage.success('添加成功')
    } else {
      ElMessage.error(res.msg)
    }
  } else {
    const res = await updateProductTag(dialogForm.value.id, {
      name: dialogForm.value.name || undefined,
      description: dialogForm.value.description || undefined,
    })
    if (res.code === 0) {
      handleSearch()
      ElMessage.success('编辑成功')
    } else {
      ElMessage.error(res.msg)
    }
  }
  dialogVisible.value = false
}

// 删除标签
function handleDelete(id: string) {
  ElMessageBox.confirm('确认删除该标签吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(async () => {
    const res = await deleteProductTag(id)
    if (res.code === 0) {
      handleSearch()
      ElMessage.success('删除成功')
    } else {
      ElMessage.error(res.msg)
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
      <Title>{{ $t('admin.product.tag.title') }}</Title>
    </Head>

    <AdminTableCard>
      <template #header>
        <!-- 搜索表单 -->
        <el-form :model="searchForm" inline>
          <el-form-item label="搜索名称">
            <el-input v-model="searchForm.keyword" placeholder="请输入标签名称/描述" />
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
        <el-button type="primary" @click="handleDialog('add')">
          <el-icon-plus class="mr-1" />添加标签
        </el-button>
      </template>

      <!-- 表格 -->
      <el-table v-loading="loading" :data="productCategoryList" border stripe>
        <el-table-column type="index" label="序号" width="80" align="center">
          <template #default="{ $index }">
            {{ getIndex($index) }}
          </template>
        </el-table-column>
        <el-table-column prop="name" label="标签名称" />
        <el-table-column prop="description" label="标签描述" />
        <el-table-column prop="createdAt" label="创建时间" :formatter="(row) => new Date(row.createdAt).toLocaleString()" />
        <el-table-column prop="updatedAt" label="更新时间" :formatter="(row) => new Date(row.updatedAt).toLocaleString()" />
        <el-table-column label="操作" width="160" align="center">
          <template #default="{ row }">
            <el-button type="primary" size="small" @click="handleDialog('edit', row)">
              <el-icon-edit class="mr-1" />编辑
            </el-button>
            <el-button type="danger" size="small" @click="handleDelete(row.id)">
              <el-icon-delete class="mr-1" />删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="mt-4 flex justify-end">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :total="total"
          :page-sizes="[10, 20, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
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
        <el-form-item label="标签名称" required>
          <el-input v-model="dialogForm.name" placeholder="请输入标签名称" />
        </el-form-item>
        <el-form-item label="标签描述">
          <el-input
            v-model="dialogForm.description"
            type="textarea"
            placeholder="请输入标签描述"
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
