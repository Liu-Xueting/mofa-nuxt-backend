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

type NotBOKey = 'updatedBy' | 'updatedAt' | 'createdBy' | 'createdAt' | 'isDeleted'
export type Debug<T> = {
  [K in keyof T as K extends NotBOKey ? never : K]: T[K]
} & {
  [K in keyof T as K extends NotBOKey ? K : never]: T[K]
}

export type AddressVO = Debug<Omit<Address, 'isDeleted'>>
export type AfterSaleVO = Debug<Omit<AfterSale, 'isDeleted'>>
export type AgentVO = Debug<Omit<Agent, 'isDeleted'>>
export type AgentApplyVO = Debug<Omit<AgentApply, 'isDeleted'>>
export type AgentReceiptVO = Debug<Omit<AgentReceipt, 'isDeleted'>>
export type ArticleVO = Debug<Omit<Article, 'isDeleted'>>
export type AwardTaskVO = Debug<Omit<AwardTask, 'isDeleted'>>
export type CartItemVO = Debug<Omit<CartItem, 'isDeleted'>>
export type ChatMessageVO = Debug<Omit<ChatMessage, 'isDeleted'>>
export type CustomerServiceVO = Debug<Omit<CustomerService, 'isDeleted'>>
export type DeliveryVO = Debug<Omit<Delivery, 'isDeleted'>>
export type DeliveryItemVO = Debug<Omit<DeliveryItem, 'isDeleted'>>
export type EmployerVO = Debug<Omit<Employer, 'isDeleted'>>
export type FavoriteItemVO = Debug<Omit<FavoriteItem, 'isDeleted'>>
export type FollowVO = Debug<Omit<Follow, 'isDeleted'>>
export type HunterVO = Debug<Omit<Hunter, 'isDeleted'>>
export type MenuVO = Menu
export type NotificationVO = Debug<Omit<Notification, 'isDeleted'>>
export type OrderVO = Debug<Omit<Order, 'isDeleted'>>
export type OrderCommentVO = Debug<Omit<OrderComment, 'isDeleted'>>
export type OrderItemVO = Debug<Omit<OrderItem, 'isDeleted'>>
export type PermissionVO<T extends 'menus' | '' = ''> = Debug<
  Omit<Permission, 'isDeleted'> & {
    menus: T extends 'menus' ? MenuVO[] : unknown
  }
>
export type ProductVO = Debug<Omit<Product, 'isDeleted'>>
export type ProductCatalogVO = Debug<Omit<ProductCatalog, 'isDeleted'>>
export type ProductCategoryVO = Debug<Omit<ProductCategory, 'isDeleted'>>
export type ProductGroupVO = Debug<Omit<ProductGroup, 'isDeleted'>>
export type ProductTagVO = Debug<Omit<ProductTag, 'isDeleted'>>
export type ResourceVO = Debug<Omit<Resource, 'isDeleted'>>
export type ResourceCatalogVO = Debug<Omit<ResourceCatalog, 'isDeleted'>>
export type RetailerApplyVO = Debug<Omit<RetailerApply, 'isDeleted'>>
export type RoleVO = Debug<Omit<Role, 'isDeleted'>>
export type SessionVO = Debug<Omit<Session, 'isDeleted'>>
export type ShopVO = Debug<Omit<Shop, 'isDeleted'>>
export type ShopApplyVO = Debug<Omit<ShopApply, 'isDeleted'>>
export type ShopCouponVO = Debug<Omit<ShopCoupon, 'isDeleted'>>
export type ShopReceiptVO = Debug<Omit<ShopReceipt, 'isDeleted'>>
export type ShopTagVO = Debug<Omit<ShopTag, 'isDeleted'>>
export type SkuVO = Debug<Omit<Sku, 'isDeleted'>>
export type TransactionVO = Debug<Omit<Transaction, 'isDeleted'>>
export type UserVO = Debug<Omit<User, 'isDeleted' | 'password' | 'lastLoginIp' | 'lastLoginAt'>>
export type UserContactVO = Debug<Omit<UserContact, 'isDeleted'>>
