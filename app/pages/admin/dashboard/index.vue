<!--
生成一个完整的仪表盘界面，使用 Element Plus，要求展现整个网站的交易量/销售收入/订单数量等信息，但需要提供模拟数据，不要从其他地方导入数据。
`VChart` 组件已经默认导入，用于渲染 ECharts 图表，可使用 `option` 属性传入 ECharts 配置。
全部使用 Tailwind CSS 进行样式布局，不要使用自定义类名，可以使用 Daisy UI 提供的工具类辅助编写样式。
-->
<script setup lang="ts">
definePageMeta({ layout: 'admin' })

// 模拟数据
const stats = ref([
  { title: '总交易额', value: '¥128,960', change: '+12%', icon: 'i-ep-money' },
  { title: '订单数量', value: '856', change: '+23%', icon: 'i-ep-shopping-cart-full' },
  { title: '用户数量', value: '2,345', change: '+8%', icon: 'i-ep-user' },
  { title: '访问量', value: '89,122', change: '+35%', icon: 'i-ep-view' },
])

function random() {
  return Math.round(300 + Math.random() * 700) / 10
}

function getData(): ECOption {
  return {
    animation: false,
    tooltip: {
      className: 'echarts-tooltip',
    },
    toolbox: {
      show: false,
      feature: {
        dataZoom: {},
        saveAsImage: {},
      },
    },
    dataset: {
      dimensions: ['Product', '2015', '2016', '2017'],
      source: [
        {
          Product: 'Matcha Latte',
          2015: random(),
          2016: random(),
          2017: random(),
        },
        {
          Product: 'Milk Tea',
          2015: random(),
          2016: random(),
          2017: random(),
        },
        {
          Product: 'Cheese Cocoa',
          2015: random(),
          2016: random(),
          2017: random(),
        },
        {
          Product: 'Walnut Brownie',
          2015: random(),
          2016: random(),
          2017: random(),
        },
      ],
    },
    xAxis: { type: 'category' },
    yAxis: {},
    itemStyle: { borderRadius: 3 },
    // Declare several bar series, each will be mapped
    // to a column of dataset.source by default.
    series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }],
  }
}

const option = shallowRef(getData())

// function refreshData() {
//   option.value = getData()
// }
</script>

<template>
  <div class="size-page">
    <Head>
      <Title>{{ $t('admin.dashboard.title') }}</Title>
    </Head>

    <!-- 统计卡片 -->
    <div class="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      <el-card v-for="item in stats" :key="item.title" class="!border-none shadow-lg">
        <div class="flex items-center justify-between">
          <div>
            <div class="text-sm text-gray-500">
              {{ item.title }}
            </div>
            <div class="mt-2 text-2xl font-bold">
              {{ item.value }}
            </div>
            <div class="mt-1 text-sm text-error">
              {{ item.change }}
            </div>
          </div>
          <div class="text-2xl text-primary opacity-20" :class="[item.icon]" />
        </div>
      </el-card>
    </div>

    <!-- 图表区域 -->
    <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <el-card class="!border-none shadow-lg">
        <template #header>
          <div class="flex items-center justify-between">
            <span class="font-bold">销售趋势</span>
            <el-select placeholder="最近6个月" size="small">
              <el-option label="最近6个月" value="6" />
              <el-option label="最近12个月" value="12" />
            </el-select>
          </div>
        </template>
        <AppChart :option="option" class="h-80 w-full" />
      </el-card>

      <el-card class="!border-none shadow-lg">
        <template #header>
          <div class="font-bold">
            订单类型分布
          </div>
        </template>
        <AppChart :option="option" class="h-80 w-full" />
      </el-card>
      <el-card class="!border-none shadow-lg">
        <template #header>
          <div class="font-bold">
            订单类型分布
          </div>
        </template>
        <AppChart :option="option" class="h-80 w-full" />
      </el-card>
      <el-card class="!border-none shadow-lg">
        <template #header>
          <div class="font-bold">
            订单类型分布
          </div>
        </template>
        <ClientOnly>
          <AppChart :option="option" class="h-80 w-full" />
        </ClientOnly>
      </el-card>
    </div>
  </div>
</template>
