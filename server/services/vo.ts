import type {
  Address,
  AfterSale,
  Agent,
  AgentApply,
  AgentReceipt,
  Article,
  AwardTask,
  CartItem,
  ChatMessage,
  CustomerService,
  Delivery,
  DeliveryItem,
  Employer,
  FavoriteItem,
  Follow,
  Hunter,
  Menu,
  Notification,
  Order,
  OrderComment,
  OrderItem,
  Permission,
  Product,
  ProductCatalog,
  ProductCategory,
  ProductGroup,
  ProductTag,
  Resource,
  ResourceCatalog,
  RetailerApply,
  Role,
  Session,
  Shop,
  ShopApply,
  ShopCoupon,
  ShopReceipt,
  ShopTag,
  Sku,
  Transaction,
  User,
  UserContact,
} from '@prisma/client'
import { omit } from 'es-toolkit/compat'

/**
 * 转换 Role 为 RoleVO
 * @openapi
 * definitions:
 *   RoleVO:
 *     type: object
 *     description: 角色 VO
 *     properties:
 *       id:
 *         type: string
 *         description: 角色 ID
 *       name:
 *         type: string
 *         description: 角色名
 *       description:
 *         type: string
 *         description: 描述
 *         nullable: true
 *       permissions:
 *         type: array
 *         description: 权限
 *         items:
 *           type: string
 *       createdAt:
 *         type: string
 *         description: 创建时间
 *         format: date-time
 *       createdBy:
 *         type: string
 *         description: 创建者
 *         nullable: true
 *       updatedAt:
 *         type: string
 *         description: 更新时间
 *         format: date-time
 *       updatedBy:
 *         type: string
 *         description: 更新者
 *         nullable: true
 */
export function toRoleVO(role?: Role | null): RoleVO | null {
  if (!role) {
    return null
  }
  return omit(role, ['isDeleted'])
}

/**
 * 转换 Menu 为 MenuVO
 * @openapi
 * definitions:
 *   MenuVO:
 *     type: object
 *     description: 菜单 VO
 *     properties:
 *       id:
 *         type: string
 *         description: 菜单 ID
 *       permissionId:
 *         type: string
 *         description: 权限 ID
 *         nullable: true
 *       name:
 *         type: string
 *         description: 菜单名称
 *       description:
 *         type: string
 *         description: 描述
 *         nullable: true
 *       type:
 *         type: string
 *         description: 菜单类型
 *         nullable: true
 *       icon:
 *         type: string
 *         description: 菜单图标
 *         nullable: true
 *       path:
 *         type: string
 *         description: 路由地址
 *         nullable: true
 *       parentId:
 *         type: string
 *         description: 父菜单 ID
 *         nullable: true
 *       order:
 *         type: integer
 *         description: 显示顺序
 *         nullable: true
 *       isExternal:
 *         type: boolean
 *         description: 是否外链
 *         nullable: true
 *       isVisible:
 *         type: boolean
 *         description: 是否显示
 *         nullable: true
 *       isDeleted:
 *         type: boolean
 *         description: 是否删除
 *       createdAt:
 *         type: string
 *         description: 创建时间
 *         format: date-time
 *       createdBy:
 *         type: string
 *         description: 创建人
 *         nullable: true
 *       updatedAt:
 *         type: string
 *         description: 更新时间
 *         format: date-time
 *       updatedBy:
 *         type: string
 *         description: 更新人
 *         nullable: true
 */
export function toMenuVO(menu?: Menu | null): MenuVO | null {
  if (!menu) {
    return null
  }
  return menu
}

/**
 * 转换 Permission 为 PermissionVO
 * @openapi
 * definitions:
 *   PermissionVO:
 *     type: object
 *     description: 权限 VO
 *     properties:
 *       id:
 *         type: string
 *         description: 权限 ID
 *       name:
 *         type: string
 *         description: 权限名称
 *       description:
 *         type: string
 *         description: 描述
 *         nullable: true
 *       permKey:
 *         type: string
 *         description: 权限标识
 *       menus:
 *         $ref: '#/definitions/MenuVO'
 *         description: 关联的菜单
 *         nullable: true
 *       createdAt:
 *         type: string
 *         description: 创建时间
 *         format: date-time
 *       createdBy:
 *         type: string
 *         description: 创建人
 *         nullable: true
 *       updatedAt:
 *         type: string
 *         description: 更新时间
 *         format: date-time
 *       updatedBy:
 *         type: string
 *         description: 更新人
 *         nullable: true
 */
export function toPermissionVO(permission?: Permission & {
  menu?: Menu
} | null): PermissionVO | null {
  if (!permission) {
    return null
  }
  return omit({
    ...permission,
    menus: toMenuVO(permission.menu) ?? undefined,
  }, ['isDeleted'])
}

/**
 * 转换 User 为 UserVO
 * @openapi
 * definitions:
 *   UserVO:
 *     type: object
 *     description: 用户 VO
 *     properties:
 *       id:
 *         type: string
 *       username:
 *         type: string
 *       avatar:
 *         type: string
 *         nullable: true
 *       nickname:
 *         type: string
 *         nullable: true
 *       description:
 *         type: string
 *         nullable: true
 *       email:
 *         type: string
 *         nullable: true
 *       phone:
 *         type: string
 *         nullable: true
 *       birthday:
 *         type: string
 *         format: date-time
 *         nullable: true
 *       gender:
 *         type: string
 *         nullable: true
 *       status:
 *         type: string
 *         enum: [ACTIVE, INACTIVE, FORBIDDEN]
 *       roles:
 *         type: array
 *         items:
 *           type: string
 *       agentId:
 *         type: string
 *         nullable: true
 *       lastLoginIp:
 *         type: string
 *         nullable: true
 *       lastLoginAt:
 *         type: string
 *         format: date-time
 *         nullable: true
 *       createdAt:
 *         type: string
 *         format: date-time
 *       createdBy:
 *         type: string
 *         nullable: true
 *       updatedAt:
 *         type: string
 *         format: date-time
 *       updatedBy:
 *         type: string
 *         nullable: true
 */
export function toUserVO(user?: User | null): UserVO | null {
  if (!user) {
    return null
  }
  return omit(user, ['password', 'isDeleted'])
}

/**
 * 转换 Address 为 AddressVO
 * @openapi
 * definitions:
 *   AddressVO:
 *     type: object
 *     description: 用户地址 VO
 *     properties:
 *       id:
 *         type: string
 *         description: 地址 ID
 *       userId:
 *         type: string
 *         description: 用户 ID
 *       recipient:
 *         type: string
 *         description: 收货人
 *       phone:
 *         type: string
 *         description: 手机号
 *       province:
 *         type: string
 *         description: 省份
 *         nullable: true
 *       city:
 *         type: string
 *         description: 城市
 *         nullable: true
 *       district:
 *         type: string
 *         description: 区县
 *         nullable: true
 *       street:
 *         type: string
 *         description: 街道
 *         nullable: true
 *       address:
 *         type: string
 *         description: 详细地址
 *       isDefault:
 *         type: boolean
 *         description: 是否默认地址
 *       createdAt:
 *         type: string
 *         description: 创建时间
 *         format: date-time
 *       updatedAt:
 *         type: string
 *         description: 更新时间
 *         format: date-time
 */
export function toAddressVO(address?: Address | null): AddressVO | null {
  if (!address) {
    return null
  }
  return omit(address, ['isDeleted'])
}

/**
 * 转换 AfterSale 为 AfterSaleVO
 * @openapi
 * definitions:
 *   AfterSaleVO:
 *     type: object
 *     description: 售后服务 VO
 *     properties:
 *       id:
 *         type: string
 *         description: 售后 ID
 *       orderId:
 *         type: string
 *         description: 订单 ID
 *       type:
 *         type: string
 *         description: 售后类型
 *         nullable: true
 *       status:
 *         type: string
 *         description: 处理状态
 *         nullable: true
 *       reason:
 *         type: string
 *         description: 售后原因
 *         nullable: true
 *       handle_time:
 *         type: string
 *         description: 处理时间
 *         format: date-time
 *       description:
 *         type: string
 *         description: 描述
 *         nullable: true
 *       createdAt:
 *         type: string
 *         description: 创建时间
 *         format: date-time
 *       createdBy:
 *         type: string
 *         description: 创建人
 *         nullable: true
 *       updatedAt:
 *         type: string
 *         description: 更新时间
 *         format: date-time
 *       updatedBy:
 *         type: string
 *         description: 更新人
 *         nullable: true
 */
export function toAfterSaleVO(afterSale?: AfterSale | null): AfterSaleVO | null {
  if (!afterSale) {
    return null
  }
  return omit(afterSale, ['isDeleted'])
}

/**
 * 转换 Agent 为 AgentVO
 * @openapi
 * definitions:
 *   AgentVO:
 *     type: object
 *     description: 代理 VO
 *     properties:
 *       id:
 *         type: string
 *         description: 代理 ID
 *       name:
 *         type: string
 *         description: 业务员名称
 *       phone:
 *         type: string
 *         description: 电话
 *         nullable: true
 *       province:
 *         type: string
 *         description: 省份
 *         nullable: true
 *       city:
 *         type: string
 *         description: 城市
 *         nullable: true
 *       district:
 *         type: string
 *         description: 区县
 *         nullable: true
 *       street:
 *         type: string
 *         description: 街道
 *         nullable: true
 *       address:
 *         type: string
 *         description: 详细地址
 *         nullable: true
 *       remark:
 *         type: string
 *         description: 备注
 *         nullable: true
 *       status:
 *         type: string
 *         description: 代理状态
 *         nullable: true
 *       createdAt:
 *         type: string
 *         description: 创建时间
 *         format: date-time
 *       createdBy:
 *         type: string
 *         description: 创建人
 *         nullable: true
 *       updatedAt:
 *         type: string
 *         description: 更新时间
 *         format: date-time
 *       updatedBy:
 *         type: string
 *         description: 更新人
 *         nullable: true
 */
export function toAgentVO(agent?: Agent | null): AgentVO | null {
  if (!agent) {
    return null
  }
  return omit(agent, ['isDeleted'])
}

/**
 * 转换 AgentApply 为 AgentApplyVO
 * @openapi
 * definitions:
 *   AgentApplyVO:
 *     type: object
 *     description: 代理申请 VO
 *     properties:
 *       id:
 *         type: string
 *         description: 申请 ID
 *       userId:
 *         type: string
 *         description: 用户 ID
 *       realName:
 *         type: string
 *         description: 真实姓名
 *       agentName:
 *         type: string
 *         description: 代理名称
 *       reason:
 *         type: string
 *         description: 申请理由
 *       phone:
 *         type: string
 *         description: 手机号
 *       resources:
 *         type: array
 *         description: 申请图片
 *         items:
 *           type: string
 *       status:
 *         type: string
 *         description: 申请状态
 *         nullable: true
 *       agentId:
 *         type: string
 *         description: 代理 ID
 *         nullable: true
 *       remark:
 *         type: string
 *         description: 备注
 *         nullable: true
 *       createdAt:
 *         type: string
 *         description: 创建时间
 *         format: date-time
 *       createdBy:
 *         type: string
 *         description: 创建人
 *         nullable: true
 *       updatedAt:
 *         type: string
 *         description: 更新时间
 *         format: date-time
 *       updatedBy:
 *         type: string
 *         description: 更新人
 *         nullable: true
 */
export function toAgentApplyVO(agentApply?: AgentApply | null): AgentApplyVO | null {
  if (!agentApply) {
    return null
  }
  return omit(agentApply, ['isDeleted'])
}

/**
 * 转换 AgentReceipt 为 AgentReceiptVO
 * @openapi
 * definitions:
 *   AgentReceiptVO:
 *     type: object
 *     description: 代理收款 VO
 *     properties:
 *       id:
 *         type: string
 *         description: 收款 ID
 *       agentId:
 *         type: string
 *         description: 代理 ID
 *       amount:
 *         type: string
 *         description: 收款金额
 *       type:
 *         type: string
 *         description: 收款类型
 *         nullable: true
 *       status:
 *         type: string
 *         description: 收款状态
 *         nullable: true
 *       remark:
 *         type: string
 *         description: 备注
 *         nullable: true
 *       createdAt:
 *         type: string
 *         description: 创建时间
 *         format: date-time
 *       createdBy:
 *         type: string
 *         description: 创建人
 *         nullable: true
 *       updatedAt:
 *         type: string
 *         description: 更新时间
 *         format: date-time
 *       updatedBy:
 *         type: string
 *         description: 更新人
 *         nullable: true
 */
export function toAgentReceiptVO(agentReceipt?: AgentReceipt | null): AgentReceiptVO | null {
  if (!agentReceipt) {
    return null
  }
  return omit(agentReceipt, ['isDeleted'])
}

/**
 * 转换 Article 为 ArticleVO
 * @openapi
 * definitions:
 *   ArticleVO:
 *     type: object
 *     description: 文章 VO
 *     properties:
 *       id:
 *         type: string
 *         description: 文章 ID
 *       userId:
 *         type: string
 *         description: 用户 ID
 *       title:
 *         type: string
 *         description: 文章标题
 *       content:
 *         type: string
 *         description: 文章内容
 *         nullable: true
 *       tags:
 *         type: array
 *         description: 文章标签
 *         items:
 *           type: string
 *       status:
 *         type: string
 *         description: 文章状态
 *         nullable: true
 *       createdAt:
 *         type: string
 *         description: 创建时间
 *         format: date-time
 *       createdBy:
 *         type: string
 *         description: 创建人
 *         nullable: true
 *       updatedAt:
 *         type: string
 *         description: 更新时间
 *         format: date-time
 *       updatedBy:
 *         type: string
 *         description: 更新人
 *         nullable: true
 */
export function toArticleVO(article?: Article | null): ArticleVO | null {
  if (!article) {
    return null
  }
  return omit(article, ['isDeleted'])
}

/**
 * 转换 AwardTask 为 AwardTaskVO
 * @openapi
 * definitions:
 *   AwardTaskVO:
 *     type: object
 *     description: 发包任务 VO
 *     properties:
 *       id:
 *         type: string
 *         description: 发包 ID
 *       title:
 *         type: string
 *         description: 标题
 *       content:
 *         type: string
 *         description: 内容
 *         nullable: true
 *       price:
 *         type: number
 *         description: 价格
 *         format: float
 *       employer:
 *         type: string
 *         description: 发包方 ID
 *       status:
 *         type: string
 *         description: 任务状态
 *         nullable: true
 *       createdAt:
 *         type: string
 *         description: 创建时间
 *         format: date-time
 *       createdBy:
 *         type: string
 *         description: 创建人
 *         nullable: true
 *       updatedAt:
 *         type: string
 *         description: 更新时间
 *         format: date-time
 *       updatedBy:
 *         type: string
 *         description: 更新人
 *         nullable: true
 */
export function toAwardTaskVO(awardTask?: AwardTask | null): AwardTaskVO | null {
  if (!awardTask) {
    return null
  }
  return omit(awardTask, ['isDeleted'])
}

/**
 * 转换 CartItem 为 CartItemVO
 * @openapi
 * definitions:
 *   CartItemVO:
 *     type: object
 *     description: 购物车项目 VO
 *     properties:
 *       id:
 *         type: string
 *         description: 购物车 ID
 *       skuId:
 *         type: string
 *         description: SKU ID
 *       userId:
 *         type: string
 *         description: 用户 ID
 *       status:
 *         type: string
 *         description: 购物车状态
 *         nullable: true
 *       quantity:
 *         type: integer
 *         description: 商品数量
 *       price:
 *         type: string
 *         description: 商品单价
 *       totalPrice:
 *         type: string
 *         description: 商品总价
 *       createdAt:
 *         type: string
 *         description: 创建时间
 *         format: date-time
 *       createdBy:
 *         type: string
 *         description: 创建人
 *         nullable: true
 *       updatedAt:
 *         type: string
 *         description: 更新时间
 *         format: date-time
 *       updatedBy:
 *         type: string
 *         description: 更新人
 *         nullable: true
 */
export function toCartItemVO(cartItem?: CartItem | null): CartItemVO | null {
  if (!cartItem) {
    return null
  }
  return omit(cartItem, ['isDeleted'])
}

/**
 * 转换 ChatMessage 为 ChatMessageVO
 * @openapi
 * definitions:
 *   ChatMessageVO:
 *     type: object
 *     description: 聊天消息 VO
 *     properties:
 *       id:
 *         type: string
 *         description: 消息 ID
 *       userContactId:
 *         type: string
 *         description: 联系信息 ID
 *       content:
 *         type: string
 *         description: 聊天内容
 *       createdAt:
 *         type: string
 *         description: 创建时间
 *         format: date-time
 *       updatedAt:
 *         type: string
 *         description: 更新时间
 *         format: date-time
 */
export function toChatMessageVO(chatMessage?: ChatMessage | null): ChatMessageVO | null {
  if (!chatMessage) {
    return null
  }
  return omit(chatMessage, ['isDeleted'])
}

/**
 * 转换 CustomerService 为 CustomerServiceVO
 * @openapi
 * definitions:
 *   CustomerServiceVO:
 *     type: object
 *     description: 客服 VO
 *     properties:
 *       id:
 *         type: string
 *         description: 客服 ID
 *       shopId:
 *         type: string
 *         description: 店铺 ID
 *       name:
 *         type: string
 *         description: 客服名称
 *       description:
 *         type: string
 *         description: 描述
 *         nullable: true
 *       phone:
 *         type: string
 *         description: 电话
 *         nullable: true
 *       email:
 *         type: string
 *         description: 邮箱
 *         nullable: true
 *       createdAt:
 *         type: string
 *         description: 创建时间
 *         format: date-time
 *       createdBy:
 *         type: string
 *         description: 创建人
 *         nullable: true
 *       updatedAt:
 *         type: string
 *         description: 更新时间
 *         format: date-time
 *       updatedBy:
 *         type: string
 *         description: 更新人
 *         nullable: true
 */
export function toCustomerServiceVO(customerService?: CustomerService | null): CustomerServiceVO | null {
  if (!customerService) {
    return null
  }
  return omit(customerService, ['isDeleted'])
}

/**
 * 转换 Delivery 为 DeliveryVO
 * @openapi
 * definitions:
 *   DeliveryVO:
 *     type: object
 *     description: 物流 VO
 *     properties:
 *       id:
 *         type: string
 *         description: 物流 ID
 *       orderId:
 *         type: string
 *         description: 订单 ID
 *       company:
 *         type: string
 *         description: 物流公司
 *       number:
 *         type: string
 *         description: 物流单号
 *       createdAt:
 *         type: string
 *         description: 创建时间
 *         format: date-time
 *       createdBy:
 *         type: string
 *         description: 创建人
 *         nullable: true
 *       updatedAt:
 *         type: string
 *         description: 更新时间
 *         format: date-time
 *       updatedBy:
 *         type: string
 *         description: 更新人
 *         nullable: true
 */
export function toDeliveryVO(delivery?: Delivery | null): DeliveryVO | null {
  if (!delivery) {
    return null
  }
  return omit(delivery, ['isDeleted'])
}

/**
 * 转换 DeliveryItem 为 DeliveryItemVO
 * @openapi
 * definitions:
 *   DeliveryItemVO:
 *     type: object
 *     description: 物流状态项 VO
 *     properties:
 *       id:
 *         type: string
 *         description: 状态 ID
 *       deliveryId:
 *         type: string
 *         description: 物流 ID
 *       status:
 *         type: string
 *         description: 物流状态
 *         nullable: true
 *       deliveryTime:
 *         type: string
 *         description: 运输时间
 *         format: date-time
 *       createdAt:
 *         type: string
 *         description: 创建时间
 *         format: date-time
 *       updatedAt:
 *         type: string
 *         description: 更新时间
 *         format: date-time
 */
export function toDeliveryItemVO(deliveryItem?: DeliveryItem | null): DeliveryItemVO | null {
  if (!deliveryItem) {
    return null
  }
  return omit(deliveryItem, ['isDeleted'])
}

/**
 * 转换 Employer 为 EmployerVO
 * @openapi
 * definitions:
 *   EmployerVO:
 *     type: object
 *     description: 发包方 VO
 *     properties:
 *       id:
 *         type: string
 *         description: 发包方 ID
 *       name:
 *         type: string
 *         description: 发包方名称
 *       userId:
 *         type: string
 *         description: 用户 ID
 *       createdAt:
 *         type: string
 *         description: 创建时间
 *         format: date-time
 *       createdBy:
 *         type: string
 *         description: 创建人
 *         nullable: true
 *       updatedAt:
 *         type: string
 *         description: 更新时间
 *         format: date-time
 *       updatedBy:
 *         type: string
 *         description: 更新人
 *         nullable: true
 */
export function toEmployerVO(employer?: Employer | null): EmployerVO | null {
  if (!employer) {
    return null
  }
  return omit(employer, ['isDeleted'])
}

/**
 * 转换 FavoriteItem 为 FavoriteItemVO
 * @openapi
 * definitions:
 *   FavoriteItemVO:
 *     type: object
 *     description: 收藏项 VO
 *     properties:
 *       id:
 *         type: string
 *         description: 收藏项 ID
 *       skuId:
 *         type: string
 *         description: SKU ID
 *       userId:
 *         type: string
 *         description: 用户 ID
 *       createdAt:
 *         type: string
 *         description: 创建时间
 *         format: date-time
 *       createdBy:
 *         type: string
 *         description: 创建人
 *         nullable: true
 *       updatedAt:
 *         type: string
 *         description: 更新时间
 *         format: date-time
 *       updatedBy:
 *         type: string
 *         description: 更新人
 *         nullable: true
 */
export function toFavoriteItemVO(favoriteItem?: FavoriteItem | null): FavoriteItemVO | null {
  if (!favoriteItem) {
    return null
  }
  return omit(favoriteItem, ['isDeleted'])
}

/**
 * 转换 Follow 为 FollowVO
 * @openapi
 * definitions:
 *   FollowVO:
 *     type: object
 *     description: 关注 VO
 *     properties:
 *       id:
 *         type: string
 *         description: 关注 ID
 *       userId:
 *         type: string
 *         description: 用户 ID
 *       shopId:
 *         type: string
 *         description: 店铺 ID
 *         nullable: true
 *       status:
 *         type: string
 *         description: 关注状态
 *         nullable: true
 *       createdAt:
 *         type: string
 *         description: 创建时间
 *         format: date-time
 *       updatedAt:
 *         type: string
 *         description: 更新时间
 *         format: date-time
 */
export function toFollowVO(follow?: Follow | null): FollowVO | null {
  if (!follow) {
    return null
  }
  return omit(follow, ['isDeleted'])
}

/**
 * 转换 Hunter 为 HunterVO
 * @openapi
 * definitions:
 *   HunterVO:
 *     type: object
 *     description: 枪手 VO
 *     properties:
 *       id:
 *         type: string
 *         description: 枪手 ID
 *       name:
 *         type: string
 *         description: 枪手名称
 *       phone:
 *         type: string
 *         description: 电话
 *         nullable: true
 *       address:
 *         type: string
 *         description: 地址
 *         nullable: true
 *       createdAt:
 *         type: string
 *         description: 创建时间
 *         format: date-time
 *       createdBy:
 *         type: string
 *         description: 创建人
 *         nullable: true
 *       updatedAt:
 *         type: string
 *         description: 更新时间
 *         format: date-time
 *       updatedBy:
 *         type: string
 *         description: 更新人
 *         nullable: true
 */
export function toHunterVO(hunter?: Hunter | null): HunterVO | null {
  if (!hunter) {
    return null
  }
  return omit(hunter, ['isDeleted'])
}

/**
 * 转换 Order 为 OrderVO
 * @openapi
 * definitions:
 *   OrderVO:
 *     type: object
 *     description: 订单 VO
 *     properties:
 *       id:
 *         type: string
 *         description: 订单 ID
 *       userId:
 *         type: string
 *         description: 用户 ID
 *       addressId:
 *         type: string
 *         description: 地址 ID
 *       transactionId:
 *         type: string
 *         description: 交易 ID
 *       description:
 *         type: string
 *         description: 描述
 *         nullable: true
 *       totalAmount:
 *         type: string
 *         description: 订单金额
 *       status:
 *         type: string
 *         description: 订单状态
 *         enum: [PENDING, PAID, DELIVERED, RECEIVED, CANCELED, REFUNDED]
 *       orderedAt:
 *         type: string
 *         description: 下单时间
 *         format: date-time
 *       paidAt:
 *         type: string
 *         description: 支付时间
 *         format: date-time
 *         nullable: true
 *       remark:
 *         type: string
 *         description: 备注
 *         nullable: true
 *       createdAt:
 *         type: string
 *         description: 创建时间
 *         format: date-time
 *       createdBy:
 *         type: string
 *         description: 创建人
 *         nullable: true
 *       updatedAt:
 *         type: string
 *         description: 更新时间
 *         format: date-time
 *       updatedBy:
 *         type: string
 *         description: 更新人
 *         nullable: true
 */
export function toOrderVO(order?: Order | null): OrderVO | null {
  if (!order) {
    return null
  }
  return omit(order, ['isDeleted'])
}

/**
 * 转换 OrderComment 为 OrderCommentVO
 * @openapi
 * definitions:
 *   OrderCommentVO:
 *     type: object
 *     description: 订单评论 VO
 *     properties:
 *       id:
 *         type: string
 *         description: 评论 ID
 *       orderItemId:
 *         type: string
 *         description: 订单项 ID
 *       userId:
 *         type: string
 *         description: 用户 ID
 *       content:
 *         type: string
 *         description: 评论内容
 *       resources:
 *         type: array
 *         description: 评论图片
 *         items:
 *           type: string
 *       status:
 *         type: string
 *         description: 评论状态
 *         nullable: true
 *       createdAt:
 *         type: string
 *         description: 创建时间
 *         format: date-time
 *       createdBy:
 *         type: string
 *         description: 创建人
 *         nullable: true
 *       updatedAt:
 *         type: string
 *         description: 更新时间
 *         format: date-time
 *       updatedBy:
 *         type: string
 *         description: 更新人
 *         nullable: true
 */
export function toOrderCommentVO(orderComment?: OrderComment | null): OrderCommentVO | null {
  if (!orderComment) {
    return null
  }
  return omit(orderComment, ['isDeleted'])
}

/**
 * 转换 OrderItem 为 OrderItemVO
 * @openapi
 * definitions:
 *   OrderItemVO:
 *     type: object
 *     description: 订单项 VO
 *     properties:
 *       id:
 *         type: string
 *         description: 订单项 ID
 *       orderId:
 *         type: string
 *         description: 订单 ID
 *       skuId:
 *         type: string
 *         description: SKU ID
 *       quantity:
 *         type: integer
 *         description: 商品数量
 *       status:
 *         type: string
 *         description: 订单项状态
 *         nullable: true
 *       remark:
 *         type: string
 *         description: 备注
 *         nullable: true
 *       discount:
 *         type: string
 *         description: 折扣信息
 *         nullable: true
 *       createdAt:
 *         type: string
 *         description: 创建时间
 *         format: date-time
 *       updatedAt:
 *         type: string
 *         description: 更新时间
 *         format: date-time
 */
export function toOrderItemVO(orderItem?: OrderItem | null): OrderItemVO | null {
  if (!orderItem) {
    return null
  }
  return omit(orderItem, ['isDeleted'])
}

/**
 * 转换 Product 为 ProductVO
 * @openapi
 * definitions:
 *   ProductVO:
 *     type: object
 *     description: 商品 VO
 *     properties:
 *       id:
 *         type: string
 *         description: 商品 ID
 *       name:
 *         type: string
 *         description: 商品名
 *       description:
 *         type: string
 *         description: 描述
 *         nullable: true
 *       price:
 *         type: number
 *         description: 价格
 *         format: float
 *       shopId:
 *         type: string
 *         description: 店铺 ID
 *       groupId:
 *         type: string
 *         description: 分组 ID
 *         nullable: true
 *       categories:
 *         type: array
 *         description: 分类
 *         items:
 *           type: string
 *       tags:
 *         type: array
 *         description: 标签
 *         items:
 *           type: string
 *       status:
 *         type: string
 *         description: 商品状态
 *         nullable: true
 *       deliveryId:
 *         type: string
 *         description: 物流 ID
 *         nullable: true
 *       createdAt:
 *         type: string
 *         description: 创建时间
 *         format: date-time
 *       createdBy:
 *         type: string
 *         description: 创建人
 *         nullable: true
 *       updatedAt:
 *         type: string
 *         description: 更新时间
 *         format: date-time
 *       updatedBy:
 *         type: string
 *         description: 更新人
 *         nullable: true
 */
export function toProductVO(product?: Product | null): ProductVO | null {
  if (!product) {
    return null
  }
  return omit(product, ['isDeleted'])
}

/**
 * 转换 ProductCatalog 为 ProductCatalogVO
 * @openapi
 * definitions:
 *   ProductCatalogVO:
 *     type: object
 *     description: 商品目录 VO
 *     properties:
 *       id:
 *         type: string
 *         description: 目录 ID
 *       name:
 *         type: string
 *         description: 目录名
 *       description:
 *         type: string
 *         description: 描述
 *         nullable: true
 *       parentId:
 *         type: string
 *         description: 父目录 ID
 *         nullable: true
 *       createdAt:
 *         type: string
 *         description: 创建时间
 *         format: date-time
 *       createdBy:
 *         type: string
 *         description: 创建人
 *         nullable: true
 *       updatedAt:
 *         type: string
 *         description: 更新时间
 *         format: date-time
 *       updatedBy:
 *         type: string
 *         description: 更新人
 *         nullable: true
 */
export function toProductCatalogVO(productCatalog?: ProductCatalog | null): ProductCatalogVO | null {
  if (!productCatalog) {
    return null
  }
  return omit(productCatalog, ['isDeleted'])
}

/**
 * 转换 ProductCategory 为 ProductCategoryVO
 * @openapi
 * definitions:
 *   ProductCategoryVO:
 *     type: object
 *     description: 商品分类 VO
 *     properties:
 *       id:
 *         type: string
 *         description: 分类 ID
 *       name:
 *         type: string
 *         description: 分类名称
 *       description:
 *         type: string
 *         description: 描述
 *         nullable: true
 *       createdAt:
 *         type: string
 *         description: 创建时间
 *         format: date-time
 *       createdBy:
 *         type: string
 *         description: 创建人
 *         nullable: true
 *       updatedAt:
 *         type: string
 *         description: 更新时间
 *         format: date-time
 *       updatedBy:
 *         type: string
 *         description: 更新人
 *         nullable: true
 */
export function toProductCategoryVO(productCategory?: ProductCategory | null): ProductCategoryVO | null {
  if (!productCategory) {
    return null
  }
  return omit(productCategory, ['isDeleted'])
}

/**
 * 转换 ProductTag 为 ProductTagVO
 * @openapi
 * definitions:
 *   ProductTagVO:
 *     type: object
 *     description: 商品标签 VO
 *     properties:
 *       id:
 *         type: string
 *         description: 标签 ID
 *       name:
 *         type: string
 *         description: 标签名
 *       description:
 *         type: string
 *         description: 描述
 *         nullable: true
 *       createdAt:
 *         type: string
 *         description: 创建时间
 *         format: date-time
 *       createdBy:
 *         type: string
 *         description: 创建人
 *         nullable: true
 *       updatedAt:
 *         type: string
 *         description: 更新时间
 *         format: date-time
 *       updatedBy:
 *         type: string
 *         description: 更新人
 *         nullable: true
 */
export function toProductTagVO(productTag?: ProductTag | null): ProductTagVO | null {
  if (!productTag) {
    return null
  }
  return omit(productTag, ['isDeleted'])
}

/**
 * 转换 ProductGroup 为 ProductGroupVO
 * @openapi
 * definitions:
 *   ProductGroupVO:
 *     type: object
 *     description: 商品分组 VO
 *     properties:
 *       id:
 *         type: string
 *         description: 分组 ID
 *       name:
 *         type: string
 *         description: 分组名
 *       description:
 *         type: string
 *         description: 描述
 *         nullable: true
 *       parentId:
 *         type: string
 *         description: 父分组 ID
 *         nullable: true
 *       createdAt:
 *         type: string
 *         description: 创建时间
 *         format: date-time
 *       createdBy:
 *         type: string
 *         description: 创建人
 *         nullable: true
 *       updatedAt:
 *         type: string
 *         description: 更新时间
 *         format: date-time
 *       updatedBy:
 *         type: string
 *         description: 更新人
 *         nullable: true
 */
export function toProductGroupVO(productGroup?: ProductGroup | null): ProductGroupVO | null {
  if (!productGroup) {
    return null
  }
  return omit(productGroup, ['isDeleted'])
}

/**
 * 转换 Resource 为 ResourceVO
 * @openapi
 * definitions:
 *   ResourceVO:
 *     type: object
 *     description: 资源 VO
 *     properties:
 *       id:
 *         type: string
 *         description: 资源 ID
 *       catalogId:
 *         type: string
 *         description: 目录 ID
 *       key:
 *         type: string
 *         description: 资源键
 *       description:
 *         type: string
 *         description: 描述
 *         nullable: true
 *       metadata:
 *         type: object
 *         description: 元数据
 *         nullable: true
 *       size:
 *         type: integer
 *         description: 文件大小
 *       url:
 *         type: string
 *         description: 资源地址
 *         nullable: true
 *       bucket:
 *         type: string
 *         description: 存储桶
 *       createdAt:
 *         type: string
 *         description: 创建时间
 *         format: date-time
 *       createdBy:
 *         type: string
 *         description: 创建人
 *         nullable: true
 *       updatedAt:
 *         type: string
 *         description: 更新时间
 *         format: date-time
 *       updatedBy:
 *         type: string
 *         description: 更新人
 *         nullable: true
 */
export function toResourceVO(resource?: Resource | null): ResourceVO | null {
  if (!resource) {
    return null
  }
  return omit(resource, ['isDeleted'])
}

/**
 * 转换 ResourceCatalog 为 ResourceCatalogVO
 * @openapi
 * definitions:
 *   ResourceCatalogVO:
 *     type: object
 *     description: 资源目录 VO
 *     properties:
 *       id:
 *         type: string
 *         description: 目录 ID
 *       parentId:
 *         type: string
 *         description: 父目录 ID
 *         nullable: true
 *       userId:
 *         type: string
 *         description: 用户 ID
 *       name:
 *         type: string
 *         description: 目录名
 *       description:
 *         type: string
 *         description: 描述
 *         nullable: true
 *       createdAt:
 *         type: string
 *         description: 创建时间
 *         format: date-time
 *       createdBy:
 *         type: string
 *         description: 创建人
 *         nullable: true
 *       updatedAt:
 *         type: string
 *         description: 更新时间
 *         format: date-time
 *       updatedBy:
 *         type: string
 *         description: 更新人
 *         nullable: true
 */
export function toResourceCatalogVO(resourceCatalog?: ResourceCatalog | null): ResourceCatalogVO | null {
  if (!resourceCatalog) {
    return null
  }
  return omit(resourceCatalog, ['isDeleted'])
}

/**
 * 转换 RetailerApply 为 RetailerApplyVO
 * @openapi
 * definitions:
 *   RetailerApplyVO:
 *     type: object
 *     description: 门店申请 VO
 *     properties:
 *       id:
 *         type: string
 *         description: 门店申请 ID
 *       userId:
 *         type: string
 *         description: 用户 ID
 *       realName:
 *         type: string
 *         description: 真实姓名
 *       retailerName:
 *         type: string
 *         description: 门店名称
 *       reason:
 *         type: string
 *         description: 申请理由
 *       phone:
 *         type: string
 *         description: 手机号
 *       resources:
 *         type: array
 *         description: 申请图片
 *         items:
 *           type: string
 *       status:
 *         type: string
 *         description: 申请状态
 *         nullable: true
 *       remark:
 *         type: string
 *         description: 备注
 *         nullable: true
 *       createdAt:
 *         type: string
 *         description: 创建时间
 *         format: date-time
 *       createdBy:
 *         type: string
 *         description: 创建人
 *         nullable: true
 *       updatedAt:
 *         type: string
 *         description: 更新时间
 *         format: date-time
 *       updatedBy:
 *         type: string
 *         description: 更新人
 *         nullable: true
 */
export function toRetailerApplyVO(retailerApply?: RetailerApply | null): RetailerApplyVO | null {
  if (!retailerApply) {
    return null
  }
  return omit(retailerApply, ['isDeleted'])
}

/**
 * 转换 Session 为 SessionVO
 * @openapi
 * definitions:
 *   SessionVO:
 *     type: object
 *     description: 会话 VO
 *     properties:
 *       id:
 *         type: string
 *         description: 会话 ID
 *       sessionToken:
 *         type: string
 *         description: 会话令牌
 *       userId:
 *         type: string
 *         description: 用户 ID
 *       expires:
 *         type: string
 *         description: 过期时间
 *         format: date-time
 *       createdAt:
 *         type: string
 *         description: 创建时间
 *         format: date-time
 *       updatedAt:
 *         type: string
 *         description: 更新时间
 *         format: date-time
 */
export function toSessionVO(session?: Session | null): SessionVO | null {
  if (!session) {
    return null
  }
  return session
}

/**
 * 转换 Shop 为 ShopVO
 * @openapi
 * definitions:
 *   ShopVO:
 *     type: object
 *     description: 店铺 VO
 *     properties:
 *       id:
 *         type: string
 *         description: 店铺 ID
 *       userId:
 *         type: string
 *         description: 用户 ID
 *       name:
 *         type: string
 *         description: 店铺名称
 *       description:
 *         type: string
 *         description: 描述
 *         nullable: true
 *       qualification:
 *         type: string
 *         description: 资质
 *         nullable: true
 *       province:
 *         type: string
 *         description: 省份
 *         nullable: true
 *       city:
 *         type: string
 *         description: 城市
 *         nullable: true
 *       district:
 *         type: string
 *         description: 区县
 *         nullable: true
 *       street:
 *         type: string
 *         description: 街道
 *         nullable: true
 *       address:
 *         type: string
 *         description: 详细地址
 *         nullable: true
 *       status:
 *         type: string
 *         description: 店铺状态
 *         nullable: true
 *       tags:
 *         type: array
 *         description: 标签
 *         items:
 *           type: string
 *       remark:
 *         type: string
 *         description: 备注
 *         nullable: true
 *       createdAt:
 *         type: string
 *         description: 创建时间
 *         format: date-time
 *       createdBy:
 *         type: string
 *         description: 创建人
 *         nullable: true
 *       updatedAt:
 *         type: string
 *         description: 更新时间
 *         format: date-time
 *       updatedBy:
 *         type: string
 *         description: 更新人
 *         nullable: true
 */
export function toShopVO(shop?: Shop | null): ShopVO | null {
  if (!shop) {
    return null
  }
  return omit(shop, ['isDeleted'])
}

/**
 * 转换 ShopApply 为 ShopApplyVO
 * @openapi
 * definitions:
 *   ShopApplyVO:
 *     type: object
 *     description: 店铺申请 VO
 *     properties:
 *       id:
 *         type: string
 *         description: 申请 ID
 *       userId:
 *         type: string
 *         description: 用户 ID
 *       realName:
 *         type: string
 *         description: 真实姓名
 *       shopName:
 *         type: string
 *         description: 店铺名称
 *       reason:
 *         type: string
 *         description: 申请理由
 *       phone:
 *         type: string
 *         description: 手机号
 *       resources:
 *         type: array
 *         description: 申请图片
 *         items:
 *           type: string
 *       status:
 *         type: string
 *         description: 申请状态
 *         enum: [PENDING, APPROVED, REJECTED]
 *       shopId:
 *         type: string
 *         description: 店铺 ID
 *         nullable: true
 *       remark:
 *         type: string
 *         description: 备注
 *         nullable: true
 *       createdAt:
 *         type: string
 *         description: 创建时间
 *         format: date-time
 *       createdBy:
 *         type: string
 *         description: 创建人
 *         nullable: true
 *       updatedAt:
 *         type: string
 *         description: 更新时间
 *         format: date-time
 *       updatedBy:
 *         type: string
 *         description: 更新人
 *         nullable: true
 */
export function toShopApplyVO(shopApply?: ShopApply | null): ShopApplyVO | null {
  if (!shopApply) {
    return null
  }
  return omit(shopApply, ['isDeleted'])
}

/**
 * 转换 ShopCoupon 为 ShopCouponVO
 * @openapi
 * definitions:
 *   ShopCouponVO:
 *     type: object
 *     description: 优惠券 VO
 *     properties:
 *       id:
 *         type: string
 *         description: 优惠券 ID
 *       shopId:
 *         type: string
 *         description: 店铺 ID
 *       name:
 *         type: string
 *         description: 优惠券名
 *       description:
 *         type: string
 *         description: 描述
 *         nullable: true
 *       startAt:
 *         type: string
 *         description: 开始时间
 *         format: date-time
 *       endAt:
 *         type: string
 *         description: 结束时间
 *         format: date-time
 *       type:
 *         type: string
 *         description: 优惠券类型
 *         nullable: true
 *       status:
 *         type: string
 *         description: 优惠券状态
 *         nullable: true
 *       createdAt:
 *         type: string
 *         description: 创建时间
 *         format: date-time
 *       createdBy:
 *         type: string
 *         description: 创建人
 *         nullable: true
 *       updatedAt:
 *         type: string
 *         description: 更新时间
 *         format: date-time
 *       updatedBy:
 *         type: string
 *         description: 更新人
 *         nullable: true
 */
export function toShopCouponVO(shopCoupon?: ShopCoupon | null): ShopCouponVO | null {
  if (!shopCoupon) {
    return null
  }
  return omit(shopCoupon, ['isDeleted'])
}

/**
 * 转换 ShopReceipt 为 ShopReceiptVO
 * @openapi
 * definitions:
 *   ShopReceiptVO:
 *     type: object
 *     description: 店铺收款 VO
 *     properties:
 *       id:
 *         type: string
 *         description: 店铺收款 ID
 *       shopId:
 *         type: string
 *         description: 店铺 ID
 *       amount:
 *         type: string
 *         description: 收款金额
 *       type:
 *         type: string
 *         description: 收款类型
 *         nullable: true
 *       status:
 *         type: string
 *         description: 收款状态
 *         nullable: true
 *       remark:
 *         type: string
 *         description: 备注
 *         nullable: true
 *       createdAt:
 *         type: string
 *         description: 创建时间
 *         format: date-time
 *       createdBy:
 *         type: string
 *         description: 创建人
 *         nullable: true
 *       updatedAt:
 *         type: string
 *         description: 更新时间
 *         format: date-time
 *       updatedBy:
 *         type: string
 *         description: 更新人
 *         nullable: true
 */
export function toShopReceiptVO(shopReceipt?: ShopReceipt | null): ShopReceiptVO | null {
  if (!shopReceipt) {
    return null
  }
  return omit(shopReceipt, ['isDeleted'])
}

/**
 * 转换 ShopTag 为 ShopTagVO
 * @openapi
 * definitions:
 *   ShopTagVO:
 *     type: object
 *     description: 店铺标签 VO
 *     properties:
 *       id:
 *         type: string
 *         description: 标签 ID
 *       name:
 *         type: string
 *         description: 标签名
 *       description:
 *         type: string
 *         description: 描述
 *         nullable: true
 *       createdAt:
 *         type: string
 *         description: 创建时间
 *         format: date-time
 *       createdBy:
 *         type: string
 *         description: 创建人
 *         nullable: true
 *       updatedAt:
 *         type: string
 *         description: 更新时间
 *         format: date-time
 *       updatedBy:
 *         type: string
 *         description: 更新人
 *         nullable: true
 */
export function toShopTagVO(shopTag?: ShopTag | null): ShopTagVO | null {
  if (!shopTag) {
    return null
  }
  return omit(shopTag, ['isDeleted'])
}

/**
 * 转换 Sku 为 SkuVO
 * @openapi
 * definitions:
 *   SkuVO:
 *     type: object
 *     description: 最小单品 VO
 *     properties:
 *       id:
 *         type: string
 *         description: SKU ID
 *       productId:
 *         type: string
 *         description: 商品 ID
 *       name:
 *         type: string
 *         description: SKU名称
 *       description:
 *         type: string
 *         description: 描述
 *         nullable: true
 *       price:
 *         type: number
 *         description: 价格
 *         format: float
 *       stock:
 *         type: integer
 *         description: 库存
 *       createdAt:
 *         type: string
 *         description: 创建时间
 *         format: date-time
 *       createdBy:
 *         type: string
 *         description: 创建人
 *         nullable: true
 *       updatedAt:
 *         type: string
 *         description: 更新时间
 *         format: date-time
 *       updatedBy:
 *         type: string
 *         description: 更新人
 *         nullable: true
 */
export function toSkuVO(sku?: Sku | null): SkuVO | null {
  if (!sku) {
    return null
  }
  return omit(sku, ['isDeleted'])
}

/**
 * 转换 Transaction 为 TransactionVO
 * @openapi
 * definitions:
 *   TransactionVO:
 *     type: object
 *     description: 交易 VO
 *     properties:
 *       id:
 *         type: string
 *         description: 交易 ID
 *       amount:
 *         type: string
 *         description: 交易金额
 *       time:
 *         type: string
 *         description: 交易时间
 *         format: date-time
 *       type:
 *         type: string
 *         description: 交易类型
 *         nullable: true
 *       status:
 *         type: string
 *         description: 交易状态
 *         nullable: true
 *       remark:
 *         type: string
 *         description: 备注
 *         nullable: true
 *       createdAt:
 *         type: string
 *         description: 创建时间
 *         format: date-time
 *       createdBy:
 *         type: string
 *         description: 创建人
 *         nullable: true
 *       updatedAt:
 *         type: string
 *         description: 更新时间
 *         format: date-time
 *       updatedBy:
 *         type: string
 *         description: 更新人
 *         nullable: true
 */
export function toTransactionVO(transaction?: Transaction | null): TransactionVO | null {
  if (!transaction) {
    return null
  }
  return omit(transaction, ['isDeleted'])
}

/**
 * 转换 UserContact 为 UserContactVO
 * @openapi
 * definitions:
 *   UserContactVO:
 *     type: object
 *     description: 联系信息 VO
 *     properties:
 *       id:
 *         type: string
 *         description: 联系信息 ID
 *       userId:
 *         type: string
 *         description: 用户 ID
 *       shopId:
 *         type: string
 *         description: 店铺 ID
 *       lastContactAt:
 *         type: string
 *         description: 最后联系时间
 *         format: date-time
 *       createdAt:
 *         type: string
 *         description: 创建时间
 *         format: date-time
 *       updatedAt:
 *         type: string
 *         description: 更新时间
 *         format: date-time
 */
export function toUserContactVO(userContact?: UserContact | null): UserContactVO | null {
  if (!userContact) {
    return null
  }
  return omit(userContact, ['isDeleted'])
}

/**
 * 转换 Notification 为 NotificationVO
 * @openapi
 * definitions:
 *   NotificationVO:
 *     type: object
 *     description: 通知 VO
 *     properties:
 *       id:
 *         type: string
 *         description: 通知 ID
 *       userId:
 *         type: string
 *         description: 用户 ID
 *       title:
 *         type: string
 *         description: 通知标题
 *       content:
 *         type: string
 *         description: 通知内容
 *         nullable: true
 *       actions:
 *         type: array
 *         description: 通知操作
 *         items:
 *           type: object
 *       type:
 *         type: string
 *         description: 通知类型
 *         nullable: true
 *       status:
 *         type: string
 *         description: 通知状态
 *         nullable: true
 *       createdAt:
 *         type: string
 *         description: 创建时间
 *         format: date-time
 *       updatedAt:
 *         type: string
 *         description: 更新时间
 *         format: date-time
 */
export function toNotificationVO(notification?: Notification | null): NotificationVO | null {
  if (!notification) {
    return null
  }
  return omit(notification, ['isDeleted'])
}
