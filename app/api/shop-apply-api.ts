import type { ShopApplyCreateRequest, ShopApplySearchRequest, ShopApplyStatusRequest } from '~~/server/schema/modules/shop-apply'

/**
 * 创建店铺申请
 */
export async function createApply(data: ShopApplyCreateRequest) {
  return useRequest<ShopApplyVO>('/api/shops/apply/create', {
    method: 'POST',
    body: data,
  })
}

/**
 * 搜索店铺申请
 */
export async function searchShopApplies(data: ShopApplySearchRequest, page: PageParamsType) {
  return useRequest<PageType<ShopApplyVO>>('/api/shops/apply/search', {
    method: 'POST',
    body: data,
    params: page,
  })
}

/**
 * 获取店铺申请详情
 */
export async function getApply(id: string) {
  return useRequest<ShopApplyVO>(`/api/shops/apply/${id}`)
}

/**
 * 修改店铺申请状态
 */
export async function updateApplyStatus(id: string, data: ShopApplyStatusRequest) {
  return useRequest<ShopApplyVO>(`/api/shops/apply/${id}/status`, {
    method: 'PUT',
    body: data,
  })
}

/**
 * 删除店铺申请
 */
export async function deleteApply(id: string) {
  return useRequest(`/api/shops/apply/${id}/delete`, {
    method: 'DELETE',
  })
}
