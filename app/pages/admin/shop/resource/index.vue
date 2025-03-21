<!--
店铺资源
生成一个完整的店铺资源管理界面，使用 Element Plus，组件已经默认全部导入。需要使用图标时，可使用 `ElIcon` 作为图标组件前缀，如 `<ElIconUser />`。需要提供模拟数据，不要从其他地方导入数据。
全部使用 Tailwind CSS 进行样式布局，不要使用自定义类名，可以使用 Daisy UI 提供的工具类辅助编写样式。
不要修改原有代码，从 `INSERT_HERE` 处开始编写。不要给页面添加额外页边距，在表格中需要操作时使用小按钮。
参照 `schema.prisma` 中的模型 `ResourceCatalog` 和 `Resource` 来设计模拟数据。
-->
<script setup lang="ts">
definePageMeta({ layout: 'admin' })

const fileList = ref([])

// 模拟资源目录数据
const catalogData = ref([
  {
    id: '1',
    name: '产品图片',
    description: '产品相关的图片资源',
    children: [
      {
        id: '1-1',
        name: '主图',
        description: '产品主图',
      },
      {
        id: '1-2',
        name: '细节图',
        description: '产品细节展示图',
      },
    ],
  },
  {
    id: '2',
    name: '店铺装修',
    description: '店铺装修相关资源',
    children: [
      {
        id: '2-1',
        name: 'Banner',
        description: '店铺横幅图片',
      },
    ],
  },
])

// 模拟资源数据
const resourceData = ref([
  {
    id: '1',
    catalogId: '1-1',
    key: 'product-main-1.jpg',
    description: '2024春季新品主图',
    size: 1024576,
    url: 'https://example.com/images/product-1.jpg',
    bucket: 'products',
    createdAt: '2024-01-15T08:00:00Z',
  },
  {
    id: '2',
    catalogId: '1-2',
    key: 'product-detail-1.jpg',
    description: '产品细节展示',
    size: 512000,
    url: 'https://example.com/images/detail-1.jpg',
    bucket: 'products',
    createdAt: '2024-01-15T08:30:00Z',
  },
  {
    id: '3',
    catalogId: '2-1',
    key: 'shop-banner-1.jpg',
    description: '店铺首页Banner',
    size: 2048000,
    url: 'https://example.com/images/banner-1.jpg',
    bucket: 'shops',
    createdAt: '2024-01-14T10:00:00Z',
  },
])

// 当前选中的目录
const currentCatalog = ref('')

// 表格列定义
const columns = [
  { prop: 'key', label: '文件名', width: '200' },
  { prop: 'description', label: '描述', width: '250' },
  {
    prop: 'size',
    label: '大小',
    width: '120',
    formatter: (row: any) => {
      return `${(row.size / 1024).toFixed(2)} KB`
    },
  },
  { prop: 'bucket', label: '存储桶', width: '120' },
  {
    prop: 'createdAt',
    label: '创建时间',
    width: '180',
    formatter: (row: any) => {
      return new Date(row.createdAt).toLocaleString()
    },
  },
]

// 处理目录选择
function handleCatalogSelect(keys: string[]) {
  currentCatalog.value = keys[0] as string
}

// 过滤资源列表
const filteredResources = computed(() => {
  if (!currentCatalog.value) {
    return resourceData.value
  }
  return resourceData.value.filter(item => item.catalogId === currentCatalog.value)
})

// 处理资源删除
function handleDelete(row: any) {
  ElMessageBox.confirm('确认删除该资源？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    resourceData.value = resourceData.value.filter(item => item.id !== row.id)
    ElMessage.success('删除成功')
  })
}

// 上传配置
const uploadConfig = {
  action: 'https://api.example.com/upload',
  headers: {
    Authorization: 'Bearer token',
  },
}

// 处理上传成功
function handleUploadSuccess(_response: any) {
  ElMessage.success('上传成功')
}
</script>

<template>
  <div class="size-page">
    <Head>
      <Title>{{ $t('admin.shop.title') }}</Title>
    </Head>

    <div class="grid grid-cols-[280px_1fr] gap-4">
      <!-- 左侧目录树 -->
      <div class="rounded-lg bg-base-100 p-4">
        <div class="mb-4 flex items-center justify-between">
          <h2 class="text-lg font-medium">
            资源目录
          </h2>
          <el-button type="primary" size="small">
            <el-icon class="mr-1">
              <ElIconPlus />
            </el-icon>新建目录
          </el-button>
        </div>
        <el-tree
          :data="catalogData"
          :props="{ children: 'children', label: 'name' }"
          default-expand-all
          @node-click="handleCatalogSelect"
        />
      </div>

      <!-- 右侧资源列表 -->
      <div class="rounded-lg bg-base-100 p-4">
        <div class="mb-4 flex items-center justify-between">
          <h2 class="text-lg font-medium">
            资源列表
          </h2>
          <el-upload
            v-model:file-list="fileList"
            :action="uploadConfig.action"
            :headers="uploadConfig.headers"
            :on-success="handleUploadSuccess"
            multiple
            :show-file-list="false"
          >
            <el-button type="primary">
              <el-icon class="mr-1">
                <ElIconUpload />
              </el-icon>上传文件
            </el-button>
          </el-upload>
        </div>

        <el-table :data="filteredResources" style="width: 100%" border>
          <el-table-column
            v-for="col in columns"
            :key="col.prop"
            :prop="col.prop"
            :label="col.label"
            :width="col.width"
            :formatter="col.formatter"
          />
          <el-table-column label="操作" width="150" fixed="right">
            <template #default="{ row }">
              <el-button type="primary" size="small" link>
                <el-icon><ElIconView /></el-icon>
              </el-button>
              <el-button type="primary" size="small" link>
                <el-icon><ElIconEdit /></el-icon>
              </el-button>
              <el-button type="danger" size="small" link @click="handleDelete(row)">
                <el-icon><ElIconDelete /></el-icon>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
