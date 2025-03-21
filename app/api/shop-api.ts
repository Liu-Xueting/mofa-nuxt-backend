import type { ShopSearchRequest, ShopUpdateRequest } from '~~/server/schema/modules/shop'
/**
 * 搜索店铺
 */
export async function searchShops(data: ShopSearchRequest, page: PageParamsType) {
  return useRequest<PageType<ShopVO>>('/api/shops/search', {
    method: 'POST',
    body: data,
    params: page,
  })
}

/**
 * 更新店铺
 */
export async function updateShop(id: string, data: ShopUpdateRequest) {
  return useRequest<ShopVO>(`/api/shops/${id}`, {
    method: 'PUT',
    body: data,
  })
}

/**
 * 删除店铺
 */
export async function deleteShop(id: string) {
  return useRequest(`/api/shops/${id}`, {
    method: 'DELETE',
  })
}

/**
 * 获取店铺列表
 */
export async function getShops() {
  return useRequest<ShopVO[]>('/api/shops', {
    method: 'GET',
  })
}
