/**
 * @openapi
 * /api/menus:
 *   get:
 *     summary: 查询用户后台菜单 @todo
 *     description: 根据用户不同角色授权不同菜单。
 *     tags:
 *      - 菜单
 *     responses:
 *       200:
 *         description: '`ResultType<MenuVO[]>` 菜单列表'
 */
export default defineEventHandler(async (_event) => {
  return Result.ok([
    {
      id: '1',
      name: '仪表盘',
      icon: 'fluent:data-pie-24-regular',
      path: '/admin/dashboard',
      pinned: true,
    },
    {
      id: '2',
      name: '用户管理',
      icon: 'fluent:person-24-regular',
      path: '/admin/user',
      children: [
        {
          id: '2-1',
          name: '用户列表',
          icon: 'fluent:people-24-regular',
          path: '/admin/user/list',
        },
        {
          id: '2-2',
          name: '角色列表',
          icon: 'fluent:person-circle-24-regular',
          path: '/admin/user/role',
        },
        {
          id: '2-3',
          name: '权限列表',
          icon: 'fluent:lock-closed-key-24-regular',
          path: '/admin/user/permission',
        },
      ],
    },
    {
      id: '3',
      name: '供应商管理',
      icon: 'fluent:building-shop-24-regular',
      path: '/admin/shop',
      children: [
        {
          id: '3-1',
          name: '店铺列表',
          icon: 'fluent:building-shop-24-regular',
          path: '/admin/shop/list',
        },
        {
          id: '3-2',
          name: '店铺申请',
          icon: 'fluent:building-shop-24-regular',
          path: '/admin/shop/apply',
        },
        {
          id: '3-3',
          name: '优惠券管理',
          icon: 'fluent:building-shop-24-regular',
          path: '/admin/shop/coupon',
        },
        {
          id: '3-4',
          name: '店铺资源',
          icon: 'fluent:building-shop-24-regular',
          path: '/admin/shop/resource',
        },
      ],
    },
    {
      id: '4',
      name: '门店管理',
      icon: 'fluent:people-community-24-regular',
      path: '/admin/retailer',
      children: [
        {
          id: '4-1',
          name: '门店列表',
          icon: 'fluent:people-community-24-regular',
          path: '/admin/retailer/list',
        },
        {
          id: '4-2',
          name: '门店申请',
          icon: 'fluent:people-community-24-regular',
          path: '/admin/retailer/apply',
        },
      ],
    },
    {
      id: '5',
      name: '商品管理',
      icon: 'fluent:box-24-regular',
      path: '/admin/product',
      children: [
        {
          id: '5-1',
          name: '商品列表',
          icon: 'fluent:box-24-regular',
          path: '/admin/product/list',
        },
        {
          id: '5-2',
          name: '商品分组',
          icon: 'fluent:box-24-regular',
          path: '/admin/product/group',
        },
        {
          id: '5-3',
          name: '商品分类',
          icon: 'fluent:box-24-regular',
          path: '/admin/product/category',
        },
        {
          id: '5-4',
          name: '商品标签',
          icon: 'fluent:box-24-regular',
          path: '/admin/product/tag',
        },
        {
          id: '5-5',
          name: '商品目录',
          icon: 'fluent:box-24-regular',
          path: '/admin/product/catalog',
        },
      ],
    },
    {
      id: '6',
      name: '订单管理',
      icon: 'fluent:cart-24-regular',
      path: '/admin/order',
      children: [
        {
          id: '6-1',
          name: '订单列表',
          icon: 'fluent:cart-24-regular',
          path: '/admin/order/list',
        },
        {
          id: '6-2',
          name: '售后列表',
          icon: 'fluent:cart-24-regular',
          path: '/admin/order/after-sale',
        },
        {
          id: '6-3',
          name: '物流列表',
          icon: 'fluent:cart-24-regular',
          path: '/admin/order/delivery',
        },
        {
          id: '6-4',
          name: '评论列表',
          icon: 'fluent:comment-24-regular',
          path: '/admin/order/comment',
        },
        {
          id: '6-5',
          name: '地址列表',
          icon: 'fluent:location-24-regular',
          path: '/admin/order/address',
        },
      ],
    },
    {
      id: '7',
      name: '财务管理',
      icon: 'fluent:currency-dollar-euro-24-regular',
      path: '/admin/finance',
      children: [
        {
          id: '7-1',
          name: '财务概览',
          icon: 'fluent:money-24-regular',
          path: '/admin/finance/overview',
        },
        {
          id: '7-2',
          name: '交易列表',
          icon: 'fluent:wallet-credit-card-24-regular',
          path: '/admin/finance/transaction',
        },
        {
          id: '7-3',
          name: '支出统计',
          icon: 'fluent:money-calculator-24-regular',
          path: '/admin/finance/outcome',
        },
        {
          id: '7-4',
          name: '商家提现',
          icon: 'fluent:people-money-24-regular',
          path: '/admin/finance/shop-receipt',
        },
        {
          id: '7-5',
          name: '代理提现',
          icon: 'fluent:person-money-24-regular',
          path: '/admin/finance/agent-receipt',
        },
      ],
    },
    {
      id: '8',
      name: '文章管理',
      icon: 'fluent:news-24-regular',
      path: '/admin/article',
      children: [
        {
          id: '8-1',
          name: '文章列表',
          icon: 'fluent:document-bullet-list-24-regular',
          path: '/admin/article/list',
        },
        {
          id: '8-2',
          name: '文章评论',
          icon: 'fluent:comment-24-regular',
          path: '/admin/article/comment',
        },
      ],
    },
    {
      id: '9',
      name: '代理管理',
      icon: 'fluent:person-money-24-regular',
      path: '/admin/agent',
      children: [
        {
          id: '9-1',
          name: '代理列表',
          icon: 'fluent:people-money-24-regular',
          path: '/admin/agent/list',
        },
        {
          id: '9-2',
          name: '代理申请',
          icon: 'fluent:person-edit-24-regular',
          path: '/admin/agent/apply',
        },
      ],
    },
    {
      id: '10',
      name: '系统设置',
      icon: 'fluent:settings-24-regular',
      path: '/admin/system',
      children: [
        {
          id: '10-1',
          name: '菜单管理',
          icon: 'fluent:apps-list-detail-24-regular',
          path: '/admin/system/menu',
        },
        {
          id: '10-2',
          name: '字典管理',
          icon: 'fluent:book-24-regular',
          path: '/admin/system/dict',
        },
      ],
    },
  ])
})
