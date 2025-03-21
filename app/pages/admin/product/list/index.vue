<!--
商品列表
- 生成一个完整的商品列表界面，使用 Element Plus，组件已经默认全部导入，请使用 kebab-case 命名。需要使用图标时，可使用 `el-icon` 作为图标组件前缀，如 `<el-icon-user />`。需要提供模拟数据，不要从其他地方导入数据。使用全局对象 `ElMessage` 来弹出消息。
- 全部使用 Tailwind CSS 进行样式布局，不要使用自定义类名。不要给页面添加额外页边距，在表格中需要操作时使用小按钮。顶部操作和搜索栏使用白色卡片包裹。
- 参照 `schema.prisma` 中的模型 `Product` 来设计模拟数据。
- 不要修改原有代码，从 `INSERT_HERE` 处开始编写。
-->
<script setup lang="ts">
import { createProduct, deleteProduct, searchProducts, updateProduct, updateProductStatus } from '~/api/product-api'
import { getProductCategories } from '~/api/product-category-api'
import { getProductGroupList } from '~/api/product-group-api'
import { getProductTags } from '~/api/product-tag-api'
import { getShops } from '~/api/shop-api'

definePageMeta({ layout: 'admin' })

// 模拟数据
// const mockProducts = ref([
//   {
//     id: '1',
//     name: '商品 A',
//     description: '这是商品 A 的描述',
//     price: 199.99,
//     shopId: '1',
//     groupId: '1',
//     categories: ['电子产品', '手机配件'],
//     tags: ['新品', '热销'],
//     status: 'active',
//     deliveryId: '1',
//     createdAt: '2024-01-15T08:00:00Z',
//     updatedAt: '2024-01-15T08:00:00Z',
//   },
//   {
//     id: '2',
//     name: '商品 B',
//     description: '这是商品 B 的描述',
//     price: 299.99,
//     shopId: '2',
//     groupId: '2',
//     categories: ['家居用品'],
//     tags: ['限时特惠'],
//     status: 'inactive',
//     deliveryId: '2',
//     createdAt: '2024-01-14T08:00:00Z',
//     updatedAt: '2024-01-14T08:00:00Z',
//   },
// ])

// 搜索条件
const searchForm = ref({
  keyword: '',
  status: '',
  category: '',
  minPrice: undefined as number | undefined,
  maxPrice: undefined as number | undefined,
})

// 状态选项
const statusOptions = [
  { value: 'active', label: '在售' },
  { value: 'inactive', label: '下架' },
  { value: 'deleted', label: '已删除' },
]

// 分页
const pagination = ref({
  currentPage: 1,
  pageSize: 10,
  total: 2,
})

const productList = ref<ProductVO[]>([])
const rowList = ref<ProductVO[]>([])

// 表格加载状态
const loading = ref(false)

const dialogVisible = ref(false)
const dialogTitle = ref('')
const form = ref({
  id: '',
  name: '',
  description: '',
  price: 0,
  shopId: '',
  groupId: '',
  categories: [] as string[],
  tags: [] as string[],
})

const rules = {
  name: [{ required: true, message: '请输入商品名称', trigger: 'blur' }],
}

interface ProductTagOrCategory {
  id: string
  name: string
}
interface Group {
  value: string
  label: string
  children: Group[]
}

const value = ref()
const groupAll = ref<Group[]>([])
const categoriesAll = ref<ProductTagOrCategory[]>([])
const tagsAll = ref<ProductTagOrCategory[]>([])
const shopAll = ref<ProductTagOrCategory[]>([])

// 计算当前行的序号
function getIndex(index: number) {
  return (pagination.value.currentPage - 1) * pagination.value.pageSize + index + 1
}

async function searchCategoriesAndTags() {
  const resCategory = await getProductCategories()
  categoriesAll.value = resCategory.data.map((category: any) => ({
    id: category.id,
    name: category.name,
  }))
  const res = await getProductTags()
  tagsAll.value = res.data.map((tag: any) => ({
    id: tag.id,
    name: tag.name,
  }))
  const resShop = await getShops()
  shopAll.value = resShop.data.map((shop: any) => ({
    id: shop.id,
    name: shop.name,
  }))
  const resGroup = await getProductGroupList()
  // 将resGroup.data这种有parentId的转换为groupAll这种children的树形结构
  groupAll.value = resGroup.data.filter((item: any) => !item.parentId).map((item: any) => {
    const children = resGroup.data.filter((child: any) => child.parentId === item.id).map((child: any) => ({
      value: child.id,
      label: child.name,
      children: [],
    }))
    return {
      value: item.id,
      label: item.name,
      children,
    }
  })
}

// 处理搜索
async function handleSearch() {
  loading.value = true
  try {
    const res = await searchProducts({
      keyword: searchForm.value.keyword,
      status: searchForm.value.status || undefined as any,
      category: searchForm.value.category,
      minPrice: searchForm.value.minPrice,
      maxPrice: searchForm.value.maxPrice,
    }, {
      page: pagination.value.currentPage,
      size: pagination.value.pageSize,
    })
    await searchCategoriesAndTags()
    rowList.value = res.data.list
    productList.value = res.data.list.map((product: any) => ({
      ...product,
      categories: product.categories.map((item: any) => {
        const category = categoriesAll.value.find(c => c.id === item)
        return category ? category.name : ''
      }),
      tags: product.tags.map((item: any) => {
        const tag = tagsAll.value.find(t => t.id === item)
        return tag ? tag.name : ''
      }),
      groupId: groupAll.value.find(group => group.value === product.groupId)?.label || '',
    }))
    pagination.value.total = res.data.total
  } finally {
    setTimeout(() => {
      loading.value = false
    }, 300)
  }
}

async function handleAdd() {
  dialogTitle.value = '添加商品'
  dialogVisible.value = true
  form.value = {
    id: '',
    name: '',
    description: '',
    price: 0,
    shopId: '',
    groupId: '',
    categories: [],
    tags: [],
  }
  await searchCategoriesAndTags()
}

// 处理重置
function handleReset() {
  searchForm.value = {
    keyword: '',
    status: '',
    category: '',
    minPrice: undefined as number | undefined,
    maxPrice: undefined as number | undefined,
  }
}

// 处理删除
function handleDelete(id: string) {
  ElMessageBox.confirm('确认要删除该商品吗？', '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(async () => {
    const res = await deleteProduct(id)
    if (res.code === 0) {
      ElMessage.success('删除成功')
      handleSearch()
    } else {
      ElMessage.error(res.msg)
    }
  })
}

// 处理编辑
async function handleEdit(index: number) {
  dialogTitle.value = '编辑商品'
  dialogVisible.value = true
  const row = rowList.value[index]!
  form.value = {
    id: row.id,
    name: row.name,
    description: row.description || '',
    price: row.price,
    shopId: row.shopId,
    groupId: row.groupId || '',
    categories: row.categories,
    tags: row.tags,
  }
  await searchCategoriesAndTags()
}

function handleSizeChange(val: number) {
  pagination.value.pageSize = val
  handleSearch()
}

function handleCurrentChange(val: number) {
  pagination.value.currentPage = val
  handleSearch()
}

async function handleSubmit() {
  if (form.value.id === '') {
    const res = await createProduct(form.value)
    if (res.code === 0) {
      handleSearch()
      ElMessage.success('添加成功')
    } else {
      ElMessage.error(res.msg)
    }
  } else {
    const res = await updateProduct(form.value.id, {
      name: form.value.name || undefined,
      description: form.value.description || undefined,
      price: form.value.price || undefined,
      shopId: form.value.shopId || undefined,
      groupId: form.value.groupId || undefined,
      categories: form.value.categories || undefined,
      tags: form.value.tags || undefined,
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

async function handleStatusChange(row: any) {
  if (row.status === 'ACTIVE') {
    const res = await updateProductStatus(row.id, {
      status: 'INACTIVE',
    })
    if (res.code === 0) {
      handleSearch()
      ElMessage.success('下架成功')
    } else {
      ElMessage.error(res.msg)
    }
  } else {
    const res = await updateProductStatus(row.id, {
      status: 'ACTIVE',
    })
    if (res.code === 0) {
      handleSearch()
      ElMessage.success('上架成功')
    } else {
      ElMessage.error(res.msg)
    }
  }
}

onMounted(() => {
  handleSearch()
})
</script>

<template>
  <div class="size-page">
    <Head>
      <Title>{{ $t('admin.product.list.title') }}</Title>
    </Head>

    <AdminTableCard>
      <!-- 顶部操作区 -->
      <template #header>
        <div class="flex flex-wrap gap-4">
          <el-input
            v-model="searchForm.keyword"
            placeholder="商品名称"
            class="w-48"
          />
          <el-select
            v-model="searchForm.status"
            placeholder="商品状态"
            class="w-32"
          >
            <el-option
              v-for="item in statusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-input
            v-model="searchForm.category"
            placeholder="商品分类"
            class="w-48"
          />
          <div class="flex items-center gap-2">
            <el-input
              v-model="searchForm.minPrice"
              type="number"
              placeholder="最低价格"
              class="w-32"
            />
            <span>-</span>
            <el-input
              v-model="searchForm.maxPrice"
              type="number"
              placeholder="最高价格"
              class="w-32"
            />
          </div>
          <el-button type="primary" @click="handleSearch">
            <el-icon-search class="mr-1" />
            搜索
          </el-button>
          <el-button @click="handleReset">
            <el-icon-refresh class="mr-1" />
            重置
          </el-button>
        </div>
      </template>

      <template #toolbar>
        <el-button type="primary" @click="handleAdd">
          <el-icon-plus class="mr-1" />
          新增商品
        </el-button>
      </template>
      <!-- 表格区域 -->
      <el-table v-loading="loading" :data="productList" style="width: 100%" border>
        <el-table-column type="index" label="序号" width="80" align="center">
          <template #default="{ $index }">
            {{ getIndex($index) }}
          </template>
        </el-table-column>
        <el-table-column prop="name" label="商品名称" min-width="80" />
        <el-table-column prop="description" label="描述" min-width="80" />
        <el-table-column prop="price" label="价格" width="120">
          <template #default="{ row }">
            ¥{{ row.price }}
          </template>
        </el-table-column>
        <el-table-column label="分类" width="300">
          <template #default="{ row }">
            <el-tag
              v-for="category in row.categories"
              :key="category"
              class="mr-1"
              size="small"
            >
              {{ category }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="标签" width="300">
          <template #default="{ row }">
            <el-tag
              v-for="tag in row.tags"
              :key="tag"
              type="success"
              class="mr-1"
              size="small"
            >
              {{ tag }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="分组" width="300">
          <template #default="{ row }">
            <el-tag
              v-for="category in row.categories"
              :key="category"
              class="mr-1"
              size="small"
            >
              {{ category }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="200">
          <template #default="{ row }">
            <div class="flex items-center gap-8">
              <el-tag
                :type="row.status === 'ACTIVE' ? 'success' : 'info'"
                size="small"
              >
                {{ row.status === 'ACTIVE' ? '在售' : '下架' }}
              </el-tag>
              <el-button
                size="small"
                type="primary"
                @click="handleStatusChange(row)"
              >
                {{ row.status === 'ACTIVE' ? '下架' : '在售' }}
              </el-button>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150" fixed="right">
          <template #default="{ $index, row }">
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
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="flex justify-end p-4">
        <el-pagination
          v-model:current-page="pagination.currentPage"
          v-model:page-size="pagination.pageSize"
          :total="pagination.total"
          :page-sizes="[10, 20, 50, 100]"
          layout="total, sizes, prev, pager, next"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </AdminTableCard>

    <!-- 表单对话框 -->
    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="500px">
      <el-form
        :model="form"
        :rules="rules"
        label-width="80px"
      >
        <el-form-item label="商品名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入商品名称" />
        </el-form-item>
        <el-form-item label="描述">
          <el-input
            v-model="form.description"
            type="textarea"
            :rows="3"
            placeholder="请输入描述"
          />
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input-number v-model="form.price" :precision="2" :step="1.00" />
        </el-form-item>
        <el-form-item label="店铺">
          <el-select v-model="form.shopId" placeholder="请选择店铺">
            <el-option
              v-for="shop in shopAll"
              :key="shop.id"
              :label="shop.name"
              :value="shop.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="分类">
          <el-select v-model="form.categories" multiple placeholder="请选择分类">
            <el-option
              v-for="category in categoriesAll"
              :key="category.id"
              :label="category.name"
              :value="category.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="分组">
          <el-tree-select
            v-model="value"
            placeholder="请选择分组"
            :data="groupAll"
            :check-strictly="false"
            :render-after-expand="false"
            style="width: 240px"
          />
        </el-form-item>
        <el-form-item label="标签">
          <el-select v-model="form.tags" multiple placeholder="请选择标签">
            <el-option
              v-for="tag in tagsAll"
              :key="tag.id"
              :label="tag.name"
              :value="tag.id"
            />
          </el-select>
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
