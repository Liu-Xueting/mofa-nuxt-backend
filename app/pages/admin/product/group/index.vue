<!--
商品分组
- 生成一个完整的商品分组管理界面，使用 Element Plus，组件已经默认全部导入，请使用 kebab-case 命名。需要使用图标时，可使用 `el-icon` 作为图标组件前缀，如 `<el-icon-user />`。需要提供模拟数据，不要从其他地方导入数据。使用全局对象 `ElMessage` 来弹出消息。
- 全部使用 Tailwind CSS 进行样式布局，不要使用自定义类名。不要给页面添加额外页边距，在表格中需要操作时使用小按钮。顶部操作和搜索栏使用白色卡片包裹。给表格添加索引列（序号）列，并添加分页器。遇到树格式请使用 `<el-table>` 的 `tree-props` 属性来构造树形结构。
- 参照 `schema.prisma` 中的模型 `Product` 来设计模拟数据。
- 不要修改原有代码，从 `INSERT_HERE` 处开始编写。
-->
<script setup lang="ts">
import { createProductGroup, deleteProductGroup, searchProductGroups, updateProductGroup } from '~/api/product-group-api'

definePageMeta({ layout: 'admin' })

// interface ProductGroup {
//   id: string
//   name: string
//   description: string | null
//   parentId: string | null
//   isDeleted: boolean
//   createdAt: string
//   updatedAt: string
// }

// 修改模拟数据，增加更多子分组
// const tableData = ref<ProductGroup[]>([
//   {
//     id: '1',
//     name: '电子产品',
//     description: '各类电子产品',
//     parentId: null,
//     isDeleted: false,
//     createdAt: '2024-01-01 12:00:00',
//     updatedAt: '2024-01-01 12:00:00',
//   },
//   {
//     id: '2',
//     name: '手机',
//     description: '智能手机',
//     parentId: '1',
//     isDeleted: false,
//     createdAt: '2024-01-01 12:00:00',
//     updatedAt: '2024-01-01 12:00:00',
//   },
//   {
//     id: '3',
//     name: '平板电脑',
//     description: '各类平板电脑',
//     parentId: '1',
//     isDeleted: false,
//     createdAt: '2024-01-01 12:00:00',
//     updatedAt: '2024-01-01 12:00:00',
//   },
//   {
//     id: '4',
//     name: '服装',
//     description: '各类服装',
//     parentId: null,
//     isDeleted: false,
//     createdAt: '2024-01-01 12:00:00',
//     updatedAt: '2024-01-01 12:00:00',
//   },
//   {
//     id: '5',
//     name: '男装',
//     description: '男士服装',
//     parentId: '4',
//     isDeleted: false,
//     createdAt: '2024-01-01 12:00:00',
//     updatedAt: '2024-01-01 12:00:00',
//   },
// ])

const searchForm = ref({
  keyword: '',
})

const productGroupList = ref<ProductGroupVO[]>([])

const dialogVisible = ref(false)
const dialogTitle = ref('添加分组')
const formData = ref({
  id: '',
  name: '',
  description: '',
  parentId: '',
})

const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(20)

const startIndex = computed(() => (currentPage.value - 1) * pageSize.value)

const loading = ref(false)
// 树形配置
const treeProps = {
  children: 'children',
  hasChildren: 'hasChildren',
}

// 将扁平数组转换为树形结构
const treeData = computed(() => {
  const data = [...productGroupList.value]
  const result: ProductGroupVO[] = []
  const map = new Map()

  // 创建所有节点的映射
  data.forEach((item) => {
    map.set(item.id, { ...item, children: [] })
  })

  // 构建树形结构
  data.forEach((item) => {
    const node = map.get(item.id)
    if (item.parentId) {
      const parent = map.get(item.parentId)
      if (parent) {
        parent.children.push(node)
      }
    } else {
      result.push(node)
    }
  })

  return result
})

function handleReset() {
  searchForm.value = {
    keyword: '',
  }
}

async function handleSearch() {
  loading.value = true
  try {
    const res = await searchProductGroups({
      keyword: searchForm.value.keyword,
    }, {
      page: currentPage.value,
      size: pageSize.value,
    })
    productGroupList.value = res.data.list
    total.value = res.data.total
  } finally {
    setTimeout(() => {
      loading.value = false
    }, 300)
  }
}

function handleAdd(row?: any) {
  dialogTitle.value = '添加目录'
  formData.value = {
    id: '',
    name: '',
    description: '',
    parentId: row?.id || undefined,
  }
  dialogVisible.value = true
}

function handleEdit(row: ProductGroupVO) {
  dialogTitle.value = '编辑分组'
  formData.value = {
    id: row.id || '',
    name: row.name || '',
    description: row.description || '',
    parentId: row.parentId || '',
  }
  dialogVisible.value = true
}

function handleDelete(id: string) {
  ElMessageBox.confirm('确定要删除该分组吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(async () => {
    const res = await deleteProductGroup(id)
    if (res.code === 0) {
      ElMessage.success('删除成功')
      handleSearch()
    } else {
      ElMessage.error(res.msg)
    }
  })
}

async function handleSubmit() {
  if (formData.value.id) {
    // 编辑
    const res = await updateProductGroup(formData.value.id, formData.value)
    if (res.code === 0) {
      ElMessage.success('编辑成功')
      handleSearch()
    } else {
      ElMessage.error(res.msg)
    }
  } else {
    // 添加
    const res = await createProductGroup(formData.value)
    if (res.code === 0) {
      ElMessage.success('添加成功')
      handleSearch()
    } else {
      ElMessage.error(res.msg)
    }
  }
  dialogVisible.value = false
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
      <Title>{{ $t('admin.product.group.title') }}</Title>
    </Head>

    <AdminTableCard>
      <!-- 搜索和操作区 -->
      <template #header>
        <el-form :model="searchForm" inline>
          <el-form-item label="分组名称">
            <el-input v-model="searchForm.keyword" placeholder="请输入分组名称/描述" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSearch">
              <el-icon-search class="mr-1" />
              搜索
            </el-button>
            <el-button @click="handleReset">
              <el-icon-refresh class="mr-1" />重置
            </el-button>
          </el-form-item>
        </el-form>
      </template>

      <template #toolbar>
        <el-button type="primary" @click="handleAdd()">
          <el-icon-plus class="mr-1" />
          添加
        </el-button>
      </template>

      <!-- 表格区域 -->
      <el-table
        v-loading="loading"
        :data="treeData"
        border
        stripe
        row-key="id"
        :tree-props="treeProps"
      >
        <el-table-column type="index" width="60" label="序号" :index="startIndex + 1" />
        <el-table-column prop="name" label="分组名称" />
        <el-table-column prop="description" label="描述" show-overflow-tooltip />
        <!-- <el-table-column prop="parentId" label="父级分组" width="120">
          <template #default="{ row }">
            {{ row.parentId ?? '-' }}
          </template>
        </el-table-column> -->
        <el-table-column prop="createdAt" label="创建时间" width="240" />
        <el-table-column label="操作" width="260" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" size="small" @click="handleAdd(row)">
              添加
            </el-button>
            <el-button type="primary" size="small" @click="handleEdit(row)">
              编辑
            </el-button>
            <el-button type="danger" size="small" @click="handleDelete(row.id)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="mt-4 flex justify-end">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 50, 100]"
          :total="total"
          layout="total, sizes, prev, pager, next"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </AdminTableCard>

    <!-- 添加/编辑对话框 -->
    <el-dialog
      v-model="dialogVisible"
      :title="dialogTitle"
      width="500px"
      destroy-on-close
    >
      <el-form :model="formData" label-width="100px">
        <el-form-item label="分组名称" required>
          <el-input v-model="formData.name" placeholder="请输入分组名称" />
        </el-form-item>
        <el-form-item label="描述">
          <el-input
            v-model="formData.description"
            type="textarea"
            placeholder="请输入描述"
          />
        </el-form-item>
        <!-- <el-form-item label="父级分组">
          <el-select placeholder="请选择父级分组" clearable>
            <el-option
              v-for="item in productGroupList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item> -->
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
