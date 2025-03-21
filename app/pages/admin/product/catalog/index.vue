<!--
商品目录
- 生成一个完整的商品目录界面，使用 Element Plus，组件已经默认全部导入，请使用 kebab-case 命名。需要使用图标时，可使用 `el-icon` 作为图标组件前缀，如 `<el-icon-user />`。需要提供模拟数据，不要从其他地方导入数据。使用全局对象 `ElMessage` 来弹出消息。
- 全部使用 Tailwind CSS 进行样式布局，不要使用自定义类名。不要给页面添加额外页边距，在表格中需要操作时使用小按钮。顶部操作和搜索栏使用白色卡片包裹。
- 参照 `schema.prisma` 中的模型 `ProductCatalog` 来设计模拟数据。商品目录是全局的，由管理员管理，请提供树组件来展示商品目录。
- 不要修改原有代码，从 `INSERT_HERE` 处开始编写。
-->
<script setup lang="ts">
import { createProductCatalog, deleteProductCatalog, searchProductCatalogs, updateProductCatalog } from '~/api/product-catalog-api'

definePageMeta({ layout: 'admin' })

// 模拟数据
// const catalogs = ref([
//   {
//     id: '1',
//     name: '电子产品',
//     description: '各类电子设备',
//     children: [
//       {
//         id: '1-1',
//         name: '手机',
//         description: '智能手机',
//       },
//       {
//         id: '1-2',
//         name: '电脑',
//         description: '笔记本和台式机',
//         children: [
//           {
//             id: '1-2-1',
//             name: '笔记本',
//             description: '便携式电脑',
//           },
//           {
//             id: '1-2-2',
//             name: '台式机',
//             description: '固定工作站',
//           },
//         ],
//       },
//     ],
//   },
//   {
//     id: '2',
//     name: '服装',
//     description: '各类服饰',
//     children: [
//       {
//         id: '2-1',
//         name: '男装',
//         description: '男士服装',
//       },
//       {
//         id: '2-2',
//         name: '女装',
//         description: '女士服装',
//       },
//     ],
//   },
// ])

// 对话框控制
const dialogVisible = ref(false)
const dialogTitle = ref('')

// 表格加载状态
const loading = ref(false)

// 分页相关
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(100)

// 表单数据
const form = ref({
  id: '',
  name: '',
  description: '',
  parentId: '',
})

// 表单规则
const rules = {
  name: [
    { required: true, message: '请输入目录名称', trigger: 'blur' },
    { min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur' },
  ],
  description: [
    { max: 200, message: '描述不能超过200个字符', trigger: 'blur' },
  ],
}

const searchForm = ref({
  keyword: '',
})

// 表格展开行
// const expandedRows = ref<string[]>([])
const startIndex = computed(() => (currentPage.value - 1) * pageSize.value)

const productCatalogList = ref<ProductCatalogVO[]>([])

// 树形配置
const treeProps = {
  children: 'children',
  hasChildren: 'hasChildren',
}

// 将扁平数组转换为树形结构
const treeData = computed(() => {
  const data = [...productCatalogList.value]
  const result: ProductCatalogVO[] = []
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

async function handleSearch() {
  loading.value = true
  try {
    const res = await searchProductCatalogs({
      keyword: searchForm.value.keyword,
    }, {
      page: currentPage.value,
      size: pageSize.value,
    })
    productCatalogList.value = res.data.list
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
  }
}

// 添加目录
function handleAdd(node?: any) {
  dialogTitle.value = '添加目录'
  form.value = {
    id: '',
    name: '',
    description: '',
    parentId: node?.id || undefined,
  }
  dialogVisible.value = true
}

// 编辑目录
function handleEdit(node: any) {
  dialogTitle.value = '编辑目录'
  form.value = {
    id: node.id || undefined,
    name: node.name || undefined,
    description: node.description || undefined,
    parentId: node.parentId || undefined,
  }
  dialogVisible.value = true
}

// 删除目录
function handleDelete(id: string) {
  ElMessageBox.confirm('确认删除该目录吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(async () => {
    // 这里应该调用实际的删除API
    const res = await deleteProductCatalog(id)
    if (res.code === 0) {
      ElMessage.success('删除成功')
      handleSearch()
    } else {
      ElMessage.error(res.msg)
    }
  }).catch(() => { })
}

// 表单提交
async function handleSubmit() {
  if (form.value.id) {
    // 这里应该调用实际的更新API
    const res = await updateProductCatalog(form.value.id, form.value)
    if (res.code === 0) {
      ElMessage.success('更新成功')
      handleSearch()
    } else {
      ElMessage.error(res.msg)
    }
  } else {
    const res = await createProductCatalog(form.value)
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

// 节点点击事件
// function handleNodeClick(data: any) {
//   currentNode.value = data
// }

onMounted(() => {
  handleSearch()
})
</script>

<template>
  <div class="size-page">
    <Head>
      <Title>{{ $t('admin.product.catalog.title') }}</Title>
    </Head>

    <AdminTableCard>
      <template #header>
        <!-- 操作栏 -->
        <el-form :model="searchForm" inline>
          <el-form-item label="搜索目录">
            <el-input v-model="searchForm.keyword" placeholder="请输入搜索目录" />
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
          添加根目录
        </el-button>
      </template>

      <!-- 目录表格树 -->
      <el-table
        stripe
        row-key="id"
        :data="treeData" :tree-props="treeProps"
        border
      >
        <el-table-column type="index" width="60" label="序号" :index="startIndex + 1" />
        <el-table-column prop="name" label="名称" min-width="200">
          <template #default="{ row }">
            <span>{{ row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="description" label="描述" min-width="300" />
        <el-table-column label="操作" width="280" fixed="right">
          <template #default="{ row }">
            <div class="flex items-center gap-2">
              <el-tooltip content="添加子目录" placement="top">
                <el-button type="primary" size="small" @click="handleAdd(row)">
                  <template #icon>
                    <el-icon-plus />
                  </template>
                  添加
                </el-button>
              </el-tooltip>
              <el-tooltip content="编辑" placement="top">
                <el-button type="primary" size="small" @click="handleEdit(row)">
                  <template #icon>
                    <el-icon-edit />
                  </template>
                  编辑
                </el-button>
              </el-tooltip>
              <el-tooltip content="删除" placement="top">
                <el-button type="danger" size="small" @click="handleDelete(row.id)">
                  <template #icon>
                    <el-icon-delete />
                  </template>
                  删除
                </el-button>
              </el-tooltip>
            </div>
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

    <!-- 编辑对话框 -->
    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="500px">
      <el-form :model="form" :rules="rules" label-width="80px">
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入目录名称" />
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="form.description" type="textarea" :rows="3" placeholder="请输入目录描述" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="flex justify-end gap-2">
          <el-button @click="dialogVisible = false">
            取消
          </el-button>
          <el-button type="primary" @click="handleSubmit">
            确认
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
