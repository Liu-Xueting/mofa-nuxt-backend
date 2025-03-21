import type {
  AddressVO as _AddressVO,
  AfterSaleVO as _AfterSaleVO,
  AgentApplyVO as _AgentApplyVO,
  AgentReceiptVO as _AgentReceiptVO,
  AgentVO as _AgentVO,
  ArticleVO as _ArticleVO,
  AwardTaskVO as _AwardTaskVO,
  CartItemVO as _CartItemVO,
  ChatMessageVO as _ChatMessageVO,
  CustomerServiceVO as _CustomerServiceVO,
  DeliveryItemVO as _DeliveryItemVO,
  DeliveryVO as _DeliveryVO,
  EmployerVO as _EmployerVO,
  FavoriteItemVO as _FavoriteItemVO,
  FollowVO as _FollowVO,
  HunterVO as _HunterVO,
  MenuVO as _MenuVO,
  NotificationVO as _NotificationVO,
  OrderCommentVO as _OrderCommentVO,
  OrderItemVO as _OrderItemVO,
  OrderVO as _OrderVO,
  PermissionVO as _PermissionVO,
  ProductCatalogVO as _ProductCatalogVO,
  ProductCategoryVO as _ProductCategoryVO,
  ProductGroupVO as _ProductGroupVO,
  ProductTagVO as _ProductTagVO,
  ProductVO as _ProductVO,
  ResourceCatalogVO as _ResourceCatalogVO,
  ResourceVO as _ResourceVO,
  RetailerApplyVO as _RetailerApplyVO,
  RoleVO as _RoleVO,
  SessionVO as _SessionVO,
  ShopApplyVO as _ShopApplyVO,
  ShopCouponVO as _ShopCouponVO,
  ShopReceiptVO as _ShopReceiptVO,
  ShopTagVO as _ShopTagVO,
  ShopVO as _ShopVO,
  SkuVO as _SkuVO,
  TransactionVO as _TransactionVO,
  UserContactVO as _UserContactVO,
  UserVO as _UserVO,
} from '~~/types/vo'

export type { MenuItemType } from '~~/types/menu'
export type MapDateAsString<T> = {
  [K in keyof T]: T[K] extends Date | null ? string | null :
    T[K] extends Date ? string : T[K]
}

export type AddressVO = MapDateAsString<_AddressVO>
export type AfterSaleVO = MapDateAsString<_AfterSaleVO>
export type AgentApplyVO = MapDateAsString<_AgentApplyVO>
export type AgentReceiptVO = MapDateAsString<_AgentReceiptVO>
export type AgentVO = MapDateAsString<_AgentVO>
export type ArticleVO = MapDateAsString<_ArticleVO>
export type AwardTaskVO = MapDateAsString<_AwardTaskVO>
export type CartItemVO = MapDateAsString<_CartItemVO>
export type ChatMessageVO = MapDateAsString<_ChatMessageVO>
export type CustomerServiceVO = MapDateAsString<_CustomerServiceVO>
export type DeliveryItemVO = MapDateAsString<_DeliveryItemVO>
export type DeliveryVO = MapDateAsString<_DeliveryVO>
export type EmployerVO = MapDateAsString<_EmployerVO>
export type FavoriteItemVO = MapDateAsString<_FavoriteItemVO>
export type FollowVO = MapDateAsString<_FollowVO>
export type HunterVO = MapDateAsString<_HunterVO>
export type MenuVO = MapDateAsString<_MenuVO>
export type NotificationVO = MapDateAsString<_NotificationVO>
export type OrderCommentVO = MapDateAsString<_OrderCommentVO>
export type OrderItemVO = MapDateAsString<_OrderItemVO>
export type OrderVO = MapDateAsString<_OrderVO>
export type PermissionVO = MapDateAsString<_PermissionVO>
export type ProductCatalogVO = MapDateAsString<_ProductCatalogVO>
export type ProductCategoryVO = MapDateAsString<_ProductCategoryVO>
export type ProductGroupVO = MapDateAsString<_ProductGroupVO>
export type ProductTagVO = MapDateAsString<_ProductTagVO>
export type ProductVO = MapDateAsString<_ProductVO>
export type ResourceCatalogVO = MapDateAsString<_ResourceCatalogVO>
export type ResourceVO = MapDateAsString<_ResourceVO>
export type RetailerApplyVO = MapDateAsString<_RetailerApplyVO>
export type RoleVO = MapDateAsString<_RoleVO>
export type SessionVO = MapDateAsString<_SessionVO>
export type ShopApplyVO = MapDateAsString<_ShopApplyVO>
export type ShopCouponVO = MapDateAsString<_ShopCouponVO>
export type ShopReceiptVO = MapDateAsString<_ShopReceiptVO>
export type ShopTagVO = MapDateAsString<_ShopTagVO>
export type ShopVO = MapDateAsString<_ShopVO>
export type SkuVO = MapDateAsString<_SkuVO>
export type TransactionVO = MapDateAsString<_TransactionVO>
export type UserContactVO = MapDateAsString<_UserContactVO>
export type UserVO = MapDateAsString<_UserVO>
